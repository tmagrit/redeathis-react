import * as React from 'react';
import { useState } from 'react';
import RichTextEditor from 'react-rte';
import Box from '@mui/material/Box';

const TextEditor = ({ value, setValue }) => {

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
                style={{ minHeight: 410 }}
            />
        </Box>
    );
  };

  export default TextEditor;