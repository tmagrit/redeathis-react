import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { publicTheme } from '../styles/publicStyles';
import { imageDescription, fitImageToContainer, truncateUrl } from '../utils'; 

// IMAGEKIT
const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;

// SWIPEABLEVIEWS AUTOPLAY 
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ResearchImagesDialog = (props) => {

  const { onClose, open, fullWidth, maxWidth, stepIndex, imgCount, contentImages } = props; //console.log('contentImages', contentImages);  

  // REF TO TRACK IMAGEbox WIDTH
  const boxRef = useRef(null);

  // REACT STATES
  const [activeStep, setActiveStep] = useState(stepIndex); 
  // IMAGE BOX WIDTH 
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(640); console.log(width, height);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  // HANDLE DIALOG CLOSE
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    setActiveStep(stepIndex);
  }, [stepIndex]);

  //TRACK WINDOW SIZE
  useEffect(() => {
      const updateWidth = () => {
      if (boxRef.current) {
          setWidth(boxRef.current.clientWidth);
          setHeight(boxRef.current.clientHeight);
      }
      };

      updateWidth();
      window.addEventListener('resize', updateWidth);

      return () => window.removeEventListener('resize', updateWidth);
      
  }, [boxRef,fitImageToContainer]);

  return (
    <ThemeProvider theme={publicTheme} > 
      <Dialog onClose={handleClose} open={open} fullWidth={fullWidth} maxWidth={maxWidth}>
        <Box 
          sx={{ 
            // maxHeight: '85vh',
            flexGrow: 1, 
            overflow: 'hidden',
            }}
          >

          <AutoPlaySwipeableViews
            interval={5000}
            autoplay={false}
            axis={publicTheme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {contentImages.map((step, index) => (
              <Box 
                key={step.fileId} 
                ref={boxRef}
                sx={{ 
                  minHeight: '70vh', 
                  display: 'block', 
                  overflow: 'hidden', 
                  width: '100%', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  }}
              >
                <img 
                  src={`${urlEndpoint}/tr:h-${fitImageToContainer(step.width, step.height, width, height).h},w-${fitImageToContainer(step.width, step.height, width, height).w}${step.filePath}?w=${fitImageToContainer(step.width, step.height, width, height).w}&h=${fitImageToContainer(step.width, step.height, width, height).h}&fit=contain&auto=format`}           
                  srcSet={`${urlEndpoint}/tr:h-${fitImageToContainer(step.width, step.height, width, height).h},w-${fitImageToContainer(step.width, step.height, width, height).w}${step.filePath}?w=${fitImageToContainer(step.width, step.height, width, height).w}&h=${fitImageToContainer(step.width, step.height, width, height).h}&fit=contain&auto=format&dpr=2 2x`}
                  alt={step.description}
                  loading="lazy"
                />
              </Box>
            ))}
          </AutoPlaySwipeableViews>
            <Typography 
              variant="body2" 
              component="div" 
              gutterBottom 
              sx={{ pt: 1, mx: 3, }}
            >
              {imageDescription(contentImages[activeStep]).title}
            </Typography>
            <Typography 
                variant="body2" 
                component="div" 
                gutterBottom 
                sx={{ mx: 3, mb: 1, }}
            >
                <Box component="span" sx={{ fontWeight: 'bold' }}>
                    {'Fonte: '}
                </Box> 
                <a href={imageDescription(contentImages[activeStep]).subtitle} target="_blank" rel="noopener noreferrer">
                    {truncateUrl(imageDescription(contentImages[activeStep]).subtitle)}
                </a>
            </Typography> 
          <MobileStepper
            steps={imgCount}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === imgCount - 1}
              >
                Próxima
                {publicTheme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {publicTheme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Anterior
              </Button>
            }
          />
        </Box>
      </Dialog>
    </ThemeProvider>
  );
};

export default ResearchImagesDialog;

ResearchImagesDialog.defaultProps = {
    fullWidth: false,
    maxWidth: 'lg',
    stepIndex: 0
};

ResearchImagesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  stepIndex: PropTypes.number.isRequired,
  imgCount: PropTypes.number.isRequired,
  contentImages: PropTypes.array.isRequired
};