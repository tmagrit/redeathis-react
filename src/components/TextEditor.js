import * as React from 'react';
import { useState } from 'react';
import RichTextEditor from 'react-rte';
import Box from '@mui/material/Box';

const TextEditor = ({ value, setValue, readOnly }) => {

    const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString(value, 'html'));
  
    const handleChange = value => {
      setEditorValue(value);
      setValue(value.toString("html"));
    };
  
    return (
        <Box sx={{ my: 1,  }}>
            <RichTextEditor
                value={editorValue}
                onChange={handleChange}
                readOnly={readOnly}
                rootStyle={{
                    fontFamily: 'inherit',
                    minHeight: 320,
                    h1: { fontSize: 300, }, 
                }}
            />
        </Box>
    );
  };

  export default TextEditor;