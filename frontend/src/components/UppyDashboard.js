import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getImages } from '../features/imagesSlice';
import { useParams } from "react-router-dom";
import Uppy from '@uppy/core/lib/Uppy';
import Dashboard from '@uppy/react/lib/Dashboard'
import Url from '@uppy/url';
import ImageKitUppyPlugin from "imagekit-uppy-plugin"
import Portuguese from '@uppy/locales/lib/pt_BR'; 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const UppyDashboard = () => {

    // REACT ROUTER DYNAMIC PARAMETER
    let params = useParams();

    // REDUX SELECTORS
    const dispatch = useDispatch();
    const research = useSelector(state => state.research.research).find(r => r.id === parseInt(params.researchId, 10) ); 

    const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
    const IMAGEKIT_PUBLIC_KEY = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
    const IMAGEKIT_AUTH_ENDPOINT = process.env.REACT_APP_IMAGEKIT_AUTH_ENDPOINT

    const [uppyOpen, setUppyOpen] = useState(false);

    // HANDLE UPPY DIALOG
    const handleUppyOpen = () => {
        setUppyOpen(true);
    };   
    
    const handleUppyClose = () => {
        setUppyOpen(false);
    };   

    // METAFIELDS ALLOWED IN IMAGE EDIT BEFORE UPLOAD
    const metaFields = [
        // {id: 'title', name: 'Título', placeholder: 'ex: Composição'},
        {id: 'description', name: 'Descrição', placeholder: 'Legenda da imagem'},
        // {id: 'date', name: 'Ano', placeholder: 'ex: 2021'},
        {id: 'technique', name: 'Técnica', placeholder: 'ex: A.s/T'},
        // {id: 'dimensions', name: 'Dimensões', placeholder: 'ex: 100 x 100 cm'},
        // {id: 'serial', name: 'Número de Série', placeholder: 'ex: 003B'},
        // {
        //     id: 'available',
        //     name: 'Disponível',
        //     render({ value, onChange, required, form }, h) {
        //         return h('input', {
        //             type: 'checkbox',
        //             required,
        //             form,
        //             onChange: (ev) => onChange(ev.target.checked ? true : false),
        //             defaultChecked: value === true,
        //         });
        //     },
        // }
    ];

    const uppy = new Uppy({
        id: 'uppy',
        allowMultipleUploadBatches: false,
        //logger: debugLogger,
        restrictions: {
            maxFileSize: 20000000,
            minFileSize: 1,
            maxTotalFileSize: 600000000,
            maxNumberOfFiles: 30,
            minNumberOfFiles: 1,
            allowedFileTypes: ['image/*'],
            requiredMetaFields: [],
        },
        meta: {
            folder: `/${research.id}`,
            //overwriteCustomMetadata: false  
        },
        onBeforeFileAdded: (currentFile, files) => {

        },
        onBeforeUpload: (files) => {
            //console.log('onBeforeUpload - FILES',files)
            //let editedFiles = {...files}
            //console.log('onBeforeUpload - editedFiles BEFORE',editedFiles)
            for (const [key, file] of Object.entries(files)) {
                //console.log(`onBeforeUpload[${key}]`, file)
                let updatedFile = {
                    ...file,
                    // customMetadata: {
                    //     description: file.meta.description
                    // }
                    meta: {
                        ...file.meta,
                        customMetadata: JSON.stringify({ 
                            title: file.meta.title || null,
                            description: file.meta.description || null,
                            date: file.meta.date || null,
                            technique: file.meta.technique || null,
                            dimensions: file.meta.dimensions || null,
                            serial: file.meta.serial || null,
                            available: file.meta.available || false
                        })
                    },
                }
                const obj = Object.assign(files[key], updatedFile);
                // if (!file.meta.caption) {
                //   uppyDashboard.info('File is missing caption', 'error')
                //   throw new Error('File is missing caption')
                // }
                //console.log('onBeforeUpload - OBJ',obj) 
            }
            //console.log('onBeforeUpload - files AFTER',files)
        },
        
    })
    .use(Url, { 
            companionUrl: SERVER_BASE_URL,
            locale: Portuguese,
    })
    .use(ImageKitUppyPlugin, {
            id: 'ImageKit',
            authenticationEndpoint: IMAGEKIT_AUTH_ENDPOINT,
            publicKey: IMAGEKIT_PUBLIC_KEY,
            metafields: [
                "customMetadata"
            ]
    })
    .on('complete', () => {
            dispatch(getImages())
    })
    // .on('file-added', (file) => {
    //   console.log('Added file', file)
    // })
    
    // DONE UPLOAD HANDLER
    const onDoneClick = () => {
            uppy.cancelAll()
            uppy.getPlugin('uppyDialog').closeModal()
    };

    // CLOSE MODAL HANDLER
    const onRequestClose = () => {
        uppy.getPlugin('uppyDialog').closeModal()
    };

    const uppyProps = {
        target: 'uppyDialog',
        //metaFields: [],
        metaFields: metaFields,
        trigger: 'uppyDashboard',
        inline: true,
        width: '100%',
        height: '90vh',
        thumbnailWidth: 280,
        showLinkToFileUploadResult: false,
        showProgressDetails: true,
        hideUploadButton: false,
        hideRetryButton: false,
        hidePauseResumeButton: false,
        hideCancelButton: false,
        hideProgressAfterFinish: false,
        doneButtonHandler: () => { onDoneClick() },
        // doneButtonHandler: () => {
        //   uppy.cancelAll()
        //   uppy.requestCloseModal()
        // },
        note: null,
        closeModalOnClickOutside: false,
        closeAfterFinish: false,
        disableStatusBar: false,
        disableInformer: false,
        disableThumbnailGenerator: false,
        disablePageScrollWhenModalOpen: true,
        animateOpenClose: true,
        fileManagerSelectionType: 'files',
        proudlyDisplayPoweredByUppy : false,
        //onRequestCloseModal: () => this.closeModal(),
        onRequestCloseModal: () => { onRequestClose() },
        showSelectedFiles: true,
        showRemoveButtonAfterComplete: false,
        showNativePhotoCameraButton: false,
        showNativeVideoCameraButton: false,
        locale: Portuguese,
        browserBackButtonClose: false,
        theme: 'light',
        autoOpenFileEditor: false,
        disableLocalFiles: false,
    };

    useEffect(() => {

        return () => uppy.close({ reason: 'unmount' })
    }, [uppy]);

    return (
        <React.Fragment>
            <Dialog id="uppyDialog" onClose={handleUppyClose} open={uppyOpen}  maxWidth="xl" fullWidth >
                <Dashboard 
                    uppy={uppy} 
                    {...uppyProps} 
                    plugins={['Url','ImageKitUppyPlugin']}
                    folder="/1"
                />
            </Dialog>
            
            <Button 
                variant="contained" 
                id="uppyDashboard"
                size="small"
                margin="dense"
                //fullWidth 
                //sx={{ mt: 2,}} 
                onClick={handleUppyOpen}  
            >
                Adicionar Imagens
            </Button>
        </React.Fragment>
    );
};

export default UppyDashboard;




























// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getImages } from '../features/imagesSlice';
// import { useParams } from "react-router-dom";
// import Uppy from '@uppy/core/lib/Uppy';
// import Dashboard from '@uppy/react/lib/Dashboard'
// import Url from '@uppy/url';
// import ImageKitUppyPlugin from "imagekit-uppy-plugin"
// import Portuguese from '@uppy/locales/lib/pt_BR'; 
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import '@uppy/core/dist/style.css';
// import '@uppy/dashboard/dist/style.css';

// const UppyDashboard = () => {

//     // REACT ROUTER DYNAMIC PARAMETER
//     let params = useParams();

//     // REDUX SELECTORS
//     const dispatch = useDispatch();
//     const research = useSelector(state => state.research.research).find(r => r.id === parseInt(params.researchId, 10) );

//     const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
//     const IMAGEKIT_PUBLIC_KEY = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
//     const IMAGEKIT_AUTH_ENDPOINT = process.env.REACT_APP_IMAGEKIT_AUTH_ENDPOINT

//     const [uppyOpen, setUppyOpen] = useState(false);

//     // HANDLE UPPY DIALOG
//     const handleUppyOpen = () => {
//         setUppyOpen(true);
//     };   
    
//     const handleUppyClose = () => {
//         setUppyOpen(false);
//     };   

//     // METAFIELDS ALLOWED IN IMAGE EDIT BEFORE UPLOAD
//     const metaFields = [
//         {
//             id: 'description', name: 'Descrição', placeholder: 'Texto descritivo da imagem'
//         }
//     ];

//     // DEBUG LOGGER FOR UPPY
//     const debugLogger = {
//         debug: (...args) => console.debug(`[Uppy] [${Date.now()}]`, ...args),
//         warn: (...args) => console.warn(`[Uppy] [${Date.now()}]`, ...args),
//         error: (...args) => console.error(`[Uppy] [${Date.now()}]`, ...args),
//     }

//     const uppy = new Uppy({
//         id: 'uppy',
//         allowMultipleUploadBatches: false,
//         logger: debugLogger,
//         restrictions: {
//             maxFileSize: null,
//             minFileSize: null,
//             maxTotalFileSize: null,
//             maxNumberOfFiles: 30,
//             minNumberOfFiles: 1,
//             allowedFileTypes: ['image/*'],
//             requiredMetaFields: [],
//         },
//         meta: {
//             folder: `/${research.id}`,
            
//             //overwriteCustomMetadata: false  
//         },
//         onBeforeFileAdded: (currentFile, files) => {

//         },
//         onBeforeUpload: (files) => {
//             //console.log('onBeforeUpload - FILES',files)
//             //let editedFiles = {...files}
//             //console.log('onBeforeUpload - editedFiles BEFORE',editedFiles)
//             for (const [key, file] of Object.entries(files)) {
//                 //console.log(`onBeforeUpload[${key}]`, file)
//                 let updatedFile = {
//                     ...file,
//                     // customMetadata: {
//                     //     description: file.meta.description
//                     // }

//                     meta: {
//                         ...file.meta,
//                         customMetadata: JSON.stringify({ description: file.meta.description })
//                     },
//                 }
//                 const obj = Object.assign(files[key], updatedFile);

//                 // if (!file.meta.caption) {
//                 //   uppyDashboard.info('File is missing caption', 'error')
//                 //   throw new Error('File is missing caption')
//                 // }
//                 //console.log('onBeforeUpload - OBJ',obj) 
//             }

//             //console.log('onBeforeUpload - files AFTER',files)
            

//         },
        
//     })
//     .use(Url, { 
//             companionUrl: SERVER_BASE_URL,
//             locale: Portuguese,
//     })
//     .use(ImageKitUppyPlugin, {
//             id: 'ImageKit',
//             authenticationEndpoint: IMAGEKIT_AUTH_ENDPOINT,
//             publicKey: IMAGEKIT_PUBLIC_KEY,
//             metafields: [
//                 "customMetadata"
//             ]
//     })
//     .on('complete', () => {
//             dispatch(getImages())
//     })
//     // .on('file-added', (file) => {
//     //   console.log('Added file', file)
//     // })
    
//     // DONE UPLOAD HANDLER
//     const onDoneClick = () => {
//             uppy.cancelAll()
//             uppy.getPlugin('uppyDialog').closeModal()
//     };

//     // CLOSE MODAL HANDLER
//     const onRequestClose = () => {
//         uppy.getPlugin('uppyDialog').closeModal()
//     };

//     const uppyProps = {
//         target: 'uppyDialog',
//         //metaFields: [],
//         metaFields: metaFields,
//         trigger: 'uppyDashboard',
//         inline: true,
//         width: 750,
//         height: 550,
//         thumbnailWidth: 280,
//         showLinkToFileUploadResult: false,
//         showProgressDetails: true,
//         hideUploadButton: false,
//         hideRetryButton: false,
//         hidePauseResumeButton: false,
//         hideCancelButton: false,
//         hideProgressAfterFinish: false,
//         doneButtonHandler: () => { onDoneClick() },
//         // doneButtonHandler: () => {
//         //   uppy.cancelAll()
//         //   uppy.requestCloseModal()
//         // },
//         note: null,
//         closeModalOnClickOutside: false,
//         closeAfterFinish: false,
//         disableStatusBar: false,
//         disableInformer: false,
//         disableThumbnailGenerator: false,
//         disablePageScrollWhenModalOpen: true,
//         animateOpenClose: true,
//         fileManagerSelectionType: 'files',
//         proudlyDisplayPoweredByUppy : false,
//         //onRequestCloseModal: () => this.closeModal(),
//         onRequestCloseModal: () => { onRequestClose() },
//         showSelectedFiles: true,
//         showRemoveButtonAfterComplete: false,
//         showNativePhotoCameraButton: false,
//         showNativeVideoCameraButton: false,
//         locale: Portuguese,
//         browserBackButtonClose: false,
//         theme: 'light',
//         autoOpenFileEditor: false,
//         disableLocalFiles: false,
//     };

//     useEffect(() => {

//         return () => uppy.close({ reason: 'unmount' })
//     }, [uppy]);

//     return (
//         <React.Fragment>
//         <Dialog id="uppyDialog" onClose={handleUppyClose} open={uppyOpen} PaperComponent="div" >
//             <Dashboard 
//             uppy={uppy} 
//             {...uppyProps} 
//             plugins={['Url','ImageKitUppyPlugin']}
//             folder="/1"
//             />
//         </Dialog>
        
//         <Button 
//             variant="contained" 
//             id="uppyDashboard"
//             fullWidth 
//             onClick={handleUppyOpen}  
//         >
//             Adicionar
//         </Button>
//         </React.Fragment>
//     );
// };

// export default UppyDashboard;