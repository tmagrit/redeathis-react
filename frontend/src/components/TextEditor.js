import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import sanitizeHtml from 'sanitize-html';

const tinyMceKey = process.env.REACT_APP_TINYMCE_API_KEY

const TextEditor = ({ value, setValue, readOnly }) => {
  const editorRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // 1. TRATAMENTO DE CONTEÚDO VAZIO - Garantir valor inicial válido
  const safeValue = value || '<p></p>';
  
  // Configuração de sanitização (memoizada para performance)
  const sanitizeOptions = React.useMemo(() => ({
    allowedTags: [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'strong', 'em', 'u', 's',
      'ul', 'ol', 'li', 'a', 'img', 'br', 
      'div', 'span', 'hr', 'table', 'thead', 
      'tbody', 'tr', 'th', 'td', 'code', 'pre'
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel', 'title'],
      img: ['src', 'alt', 'width', 'height', 'style', 'title', 'data-mce-src'],
      div: ['class', 'style'],
      span: ['class', 'style'],
      table: ['class', 'style', 'border'],
      td: ['class', 'style', 'colspan', 'rowspan'],
      th: ['class', 'style', 'colspan', 'rowspan']
    },
    allowedStyles: {
      '*': {
        'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
        'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/, /^[a-z]+$/],
        'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/, /^[a-z]+$/]
      },
      img: {
        'float': [/left|right/],
        'margin': [/^\d+(px|%)$/],
        'width': [/^\d+(px|%)$/],
        'height': [/^\d+(px|%)$/],
        'max-width': [/^\d+(px|%)$/],
        'max-height': [/^\d+(px|%)$/]
      }
    },
    transformTags: {
      'a': (tagName, attribs) => {
        // Adiciona segurança a links externos
        if (attribs.href && attribs.href.startsWith('http')) {
          return {
            tagName: 'a',
            attribs: {
              ...attribs,
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          };
        }
        return { tagName, attribs };
      }
    },
    // Opção específica do sanitize-html-react:
    transformText: (text) => {
      // Preserva quebras de linha
      return text.replace(/\n/g, '<br>');
    }
  }), []);

  // Sanitização otimizada com useCallback
  const sanitizeContent = useCallback((html) => {
    if (!html) return '';
    
    // SanitizeHtmlReact retorna um elemento React
    const sanitizedElement = sanitizeHtml(html, sanitizeOptions);
    
    // Converter elemento React para string HTML usando a API DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString('<div></div>', 'text/html');
    const container = doc.body.firstChild;
    
    // Renderiza o elemento sanitizado no container temporário
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(sanitizedElement);
    
    return tempDiv.innerHTML;
  }, [sanitizeOptions]);

  // Handler para mudanças no editor com debounce
  const handleChange = useCallback((newValue) => {
    if (!isMounted) return;
    
    // Atualiza imediatamente para feedback visual
    setValue(newValue);
    
    // Sanitização assíncrona com debounce
    const sanitizeTimeout = setTimeout(() => {
      const cleanHtml = sanitizeContent(newValue);
      
      // Se o conteúdo foi alterado pela sanitização
      if (cleanHtml !== newValue) {
        setValue(cleanHtml);
        
        // Atualiza o editor com o conteúdo sanitizado
        if (editorRef.current) {
          editorRef.current.setContent(cleanHtml);
        }
      }
    }, 300);
    
    return () => clearTimeout(sanitizeTimeout);
  }, [isMounted, setValue, sanitizeContent]);

  // Handler para inicialização do editor
  const handleInit = useCallback((evt, editor) => {
    editorRef.current = editor;
  }, []);

  // 4. TRATAMENTO DE ERROS GLOBAL - Controle de montagem/desmontagem
  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      setIsMounted(false);
      
      // Destruir editor ao desmontar o componente
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  // STYLING 

  const contentStyle = `
    body {
      font-family: 'Roboto';
      font-size: 16px;
      font-weight: 300;
      background-color: #f4f0eb;
    }
    h1 {
        font-family: 'Aberforth';
        font-weight: 300;
        font-size: 32px;
        text-transform: uppercase;
        margin-block-start: 20px;
        margin-block-end: 20px;
        color: #f5a449;
    }
    h2 {
      font-family: 'Aberforth';
      font-weight: 300;
      font-size: 25px;
      text-transform: uppercase;
      margin-block-start: 16px;
      margin-block-end: 16px;
      color: #f5a449;em 0;
    }
    h3 {
      font-family: 'Roboto';
      font-weight: 500;
      margin-block-start: 13px;
      margin-block-end: 13px;
      font-size: 20px;
    }
    h4 {
      font-family: 'Roboto';
      font-weight: 400;
      margin-block-start: 10px;
      margin-block-end: 10px;
      font-size: 16px;
    }
  `;
  
  const setupEditor = (editor) => {
    const applyStylesToNode = (node) => {
      switch (node.nodeName.toLowerCase()) {
        case 'h1':
          node.className = 'institutional-h1';
          break;
        case 'h2':
          node.className = 'institutional-h2';
          break;
        case 'h3':
          node.className = 'institutional-h3';
          break;
        case 'h4':
          node.className = 'institutional-h4';
          break;    
        case 'p':
        case 'ul':
        case 'ol':
        case 'table':
          node.className = 'institutional-body';
          break;
      }
      
      Array.from(node.children).forEach(applyStylesToNode);
    };

    editor.on('init', () => {
      // Aplica estilos ao conteúdo inicial
      editor.dom.addClass(editor.dom.select('h1'), 'institutional-h1');
      editor.dom.addClass(editor.dom.select('h2'), 'institutional-h2');
      editor.dom.addClass(editor.dom.select('h3'), 'institutional-h3');
      editor.dom.addClass(editor.dom.select('h4'), 'institutional-h4');
      editor.dom.addClass(editor.dom.select('p, ul, ol, table'), 'institutional-body');
    });

    // Aplica estilos apenas quando o editor perde o foco
    editor.on('blur', () => {
      const selection = editor.selection.getBookmark();
      applyStylesToNode(editor.getBody());
      editor.selection.moveToBookmark(selection);
    });

    // Aplica estilos ao salvar
    editor.on('submit', () => {
      applyStylesToNode(editor.getBody());
    });
  };



  return (
    <div className="tox-tinymce-container" style={{ margin: '16px 0' }}>
      <Editor
        apiKey={tinyMceKey}
        onInit={handleInit}
        value={safeValue}
        onEditorChange={handleChange}
        disabled={readOnly}
        init={{
          height: 320,
          menubar: false,
          plugins: 'lists link image table code',
          toolbar: 'undo redo | styles | bold italic underline strikethrough | ' +
                   'alignleft aligncenter alignright | bullist numlist | ' +
                   'outdent indent | link image',
          // content_style: 'body { font-family:Roboto,Arial,sans-serif; font-size:144px }',
          content_style: contentStyle,
          style_formats: [
            { title: 'Título 1', block: 'h1', classes: 'institutional-h1' },
            { title: 'Título 2', block: 'h2', classes: 'institutional-h2' },
            { title: 'Título 3', block: 'h3', classes: 'institutional-h3' },
            { title: 'Título 4', block: 'h4', classes: 'institutional-h4' },
            { title: 'Parágrafo', block: 'p', classes: 'institutional-body' },
          ],
          branding: false,
          content_security_policy: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;",
          sandbox: 'allow-same-origin allow-scripts',
          // STYLING FUNCTION
          setup:setupEditor,
          // TODO: REWRITE IMAGE UPLOAD
          images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
            // Implementação de upload com tratamento de erros
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            
            fetch('your-image-upload-endpoint', {
              method: 'POST',
              body: formData
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              if (data.location) {
                resolve(data.location);
              } else {
                reject('Localização inválida na resposta do servidor');
              }
            })
            .catch(error => {
              console.error('Erro no upload de imagem:', error);
              reject('Falha no upload: ' + error.message);
            });
          })
        }}
      />
    </div>
  );
};

export default TextEditor;







// toolbar: 'undo redo | styles | bold italic underline strikethrough | ' +
//                    'alignleft aligncenter alignright alignjustify | bullist numlist | ' +
//                    'outdent indent | link image table code',
          //content_style: 'body { font-family:Roboto,Arial,sans-serif; font-size:14px }',




//ORIGINAL SANITIZE OPTIONS
  // const sanitizeOptions = React.useMemo(() => ({
  //   allowedTags: [
  //     'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
  //     'strong', 'em', 'u', 's', 'blockquote', 
  //     'ul', 'ol', 'li', 'a', 'img', 'br', 
  //     'div', 'span', 'hr', 'table', 'thead', 
  //     'tbody', 'tr', 'th', 'td', 'code', 'pre'
  //   ],
  //   allowedAttributes: {
  //     a: ['href', 'target', 'rel', 'title'],
  //     img: ['src', 'alt', 'width', 'height', 'style', 'title', 'data-mce-src'],
  //     div: ['class', 'style'],
  //     span: ['class', 'style'],
  //     table: ['class', 'style', 'border'],
  //     td: ['class', 'style', 'colspan', 'rowspan'],
  //     th: ['class', 'style', 'colspan', 'rowspan']
  //   },
  //   allowedStyles: {
  //     '*': {
  //       'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
  //       'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/, /^[a-z]+$/],
  //       'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/, /^[a-z]+$/]
  //     },
  //     img: {
  //       'float': [/left|right/],
  //       'margin': [/^\d+(px|%)$/],
  //       'width': [/^\d+(px|%)$/],
  //       'height': [/^\d+(px|%)$/],
  //       'max-width': [/^\d+(px|%)$/],
  //       'max-height': [/^\d+(px|%)$/]
  //     }
  //   },
  //   transformTags: {
  //     'a': (tagName, attribs) => {
  //       // Adiciona segurança a links externos
  //       if (attribs.href && attribs.href.startsWith('http')) {
  //         return {
  //           tagName: 'a',
  //           attribs: {
  //             ...attribs,
  //             target: '_blank',
  //             rel: 'noopener noreferrer'
  //           }
  //         };
  //       }
  //       return { tagName, attribs };
  //     }
  //   },
  //   // Opção específica do sanitize-html-react:
  //   transformText: (text) => {
  //     // Preserva quebras de linha
  //     return text.replace(/\n/g, '<br>');
  //   }
  // }), []);


























// VALID TINYMCE

// import React, { useRef } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import sanitizeHtml from 'sanitize-html';

// const TextEditor = ({ value, setValue, readOnly }) => {
//   const editorRef = useRef(null);
  
//   const sanitizeOptions = {
//     allowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'img'],
//     allowedAttributes: {
//       a: ['href', 'target', 'rel'],
//       img: ['src', 'alt', 'width', 'height', 'style']
//     },
//     allowedStyles: {
//       img: {
//         'float': [/left|right/],
//         'margin': [/^\d+px$/],
//         'width': [/^\d+px$/],
//         'height': [/^\d+px$/]
//       }
//     }
//   };

//   const handleChange = (newValue) => {
//     const cleanHtml = sanitizeHtml(newValue, sanitizeOptions);
//     setValue(cleanHtml);
//   };

//   return (
//     <div style={{ margin: '16px 0' }}>
//       <Editor
//         apiKey='cagseytw4ey9c641l9vmk9uy9i3tt54i1ildifxiey7l1tw8'
//         onInit={(evt, editor) => editorRef.current = editor}
//         initialValue={value}
//         onEditorChange={handleChange}
//         disabled={readOnly}
//         init={{
//           height: 320,
//           menubar: false,
//           plugins: 'lists link image table code',
//           toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
//           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
//           images_upload_url: 'your-image-upload-endpoint', // Opcional para upload de imagens
//           automatic_uploads: true,
//           branding: false
//         }}
//       />
//     </div>
//   );
// };

// export default TextEditor;




















// OLD REACT RTE

// import * as React from 'react';
// import { useState } from 'react';
// import RichTextEditor from 'react-rte';
// import Box from '@mui/material/Box';

// const TextEditor = ({ value, setValue, readOnly }) => {

//     const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString(value, 'html'));
  
//     const handleChange = value => {
//       setEditorValue(value);
//       setValue(value.toString("html"));
//     };
  
//     return (
//         <Box sx={{ my: 1,  }}>
//             <RichTextEditor
//                 value={editorValue}
//                 onChange={handleChange}
//                 readOnly={readOnly}
//                 rootStyle={{
//                     fontFamily: 'inherit',
//                     backgroundColor: '#EBE5DF',
//                     minHeight: 320,
//                     h1: { fontSize: 300, }, 
//                     border: 'none',
//                     // borderRadius: 4, 
//                     // borderColor: 'rgba(0, 0, 0, 0.26)',
//                     // '&:hover': {
//                     // borderColor: 'rgba(0, 0, 0, 0.54)',
//                     // },
//                 }}
//             />
//         </Box>
//     );
//   };

//   export default TextEditor;