import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import sanitizeHtml from 'sanitize-html';
import { teamContentStyle, teamStyleFormats } from '../styles/textEditorStyles'

const tinyMceKey = process.env.REACT_APP_TINYMCE_API_KEY

const TextEditorTeam = ({ value, setValue, readOnly }) => {

  const editorRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // TRATAMENTO DE CONTEÚDO VAZIO - Garantir valor inicial válido
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
    }
    // Opção específica do sanitize-html-react:
    // transformText: (text) => {
    //   // Preserva quebras de linha
    //   return text.replace(/\n/g, '<br>');
    // }
  }), []);

  // Sanitização corrigida - não tente manipular DOM diretamente
  const sanitizeContent = useCallback(
    (html) => html ? sanitizeHtml(html, sanitizeOptions) : '',
    [sanitizeOptions]
  );

  // Handler para mudanças no editor com debounce
  const handleChange = useCallback((newValue) => {
    if (!isMounted) return;
    
    // Atualiza imediatamente para feedback visual
    setValue(newValue); 
    
    // return () => clearTimeout(sanitizeTimeout);
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
  
  const setupEditor = (editor) => {

    editor.on('init', () => {
      // Aplica estilos ao conteúdo inicial
      // applyStyles(editor.getBody());
      sanitizeContent(editor.getBody());
    });

    // Aplica estilos apenas quando o editor perde o foco
    editor.on('blur', () => {
      const selection = editor.selection.getBookmark();
      // applyStyles(editor.getBody());
      sanitizeContent(editor.getBody());
      editor.selection.moveToBookmark(selection);
    });

    // Aplica estilos ao salvar
    editor.on('submit', () => {
      // applyStyles(editor.getBody());
      sanitizeContent(editor.getBody());
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
          height: 720,
          menubar: false,
          plugins: 'lists link image table code',
          toolbar: 'undo redo | styles | bold italic underline strikethrough | ' +
                   'alignleft aligncenter alignright | bullist numlist | ' +
                   'outdent indent | link',
          content_style: teamContentStyle,
          style_formats: teamStyleFormats,
          branding: false,
          content_security_policy: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;",
          sandbox: 'allow-same-origin allow-scripts',
          // STYLING FUNCTION
          setup:setupEditor,
        }}
      />
    </div>
  );
};

export default TextEditorTeam;