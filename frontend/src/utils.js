export function imageDescription(image) {
    //let title = `[${image.date || 'xxxx'}] ${image.title || ''}`;
    let description = image.description || '';
    let link = image.technique || '---';
    //let subtitle = `#${number} ${description}`;
    
    return {
        title: description,
        subtitle: link
    };
};

export function publicImageDescription(image) {
    if(image !== null && typeof image === "object") {
        let title = image.hasOwnProperty("title") ? image.title : '';
        let date = image.hasOwnProperty("date") ? image.date : '';
        let description = image.hasOwnProperty("description") ? image.description : '';
        let technique = image.hasOwnProperty("technique") ? image.technique : '';
        let dimensions = image.hasOwnProperty("dimensions") ? image.dimensions : '';
    
        let complement = `${description ? description + ' ' : ''}${technique ? technique + ' ' : ''}${dimensions ? dimensions : ''}`;
        
        return {
            title: title,
            date: date,
            complement: complement
        };
    } else {
        return {
            title: '',
            date: '',
            complement: ''
        };
    };

};

export function showControls(path) {

    if(path[1] === 'content') 
        return true;
    else
        return false;
};

export function activeMenu(path, id, location) {
    if(path[1] === location && path[2] === `${id}`) 
        return true;
    else
        return false;
};

export function hasChildren(item) {
    const { items: children } = item;
    if (children === undefined) {
        return false;
    }
    if (children.constructor !== Array) {
        return false;
    }
    if (children.length === 0) {
        return false;
    }
    return true;
};

export function galleryCols (w) {
    if(w >= 1400) 
        return 5;
    if(1400 > w && w >= 1040) 
        return 4;  
    if(1040 > w && w >= 750) 
        return 3; 
    if(750 > w && w >= 460) 
        return 2;                          
    else
        return 1;
};

export function publicGalleryCols (w) {
    if(w >= 1400) 
        return 7;
    if(1400 > w && w >= 1040) 
        return 6;  
    if(1040 > w && w >= 750) 
        return 5; 
    if(750 > w && w >= 460) 
        return 4;                          
    else
        return 3;
};

export function sortStrings( a, b ) {
    if ( a === null || a === '' ){
        return 1;
    }
    if ( b === null || b === '' ){
        return -1;
    }
    if ( a ===  b ){
        return 0;
    }
    return a > b ? 1 : -1;
};

export function sortDescendentStrings( a, b ) {
    if ( a === null || a === '' ){
        return 1;
    }
    if ( b === null || b === '' ){
        return -1;
    }
    if ( a ===  b ){
        return 0;
    }
    return a < b ? 1 : -1;
};

export function sortDescendentStringYears( sa, sb ) {
    const a = sa.string;
    const b = sb.string;

    if ( a === null || a === '' ){
        return 1;
    }
    if ( b === null || b === '' ){
        return -1;
    }
    if ( a ===  b ){
        return 0;
    }
    return a < b ? 1 : -1;
};

export function sortImages( a, b ) {
    if ( a.serial === null || a.serial === '' ){
        return 1;
    }
    if ( b.serial === null || b.serial === '' ){
        return -1;
    }
    if ( a.serial ===  b.serial ){
        return 0;
    }
    return parseInt(a.serial, 10) > parseInt(b.serial, 10) ? 1 : -1;
};

export function sortByDate( a, b ) {
    if ( a.date.year === null || a.date.year === '' ){
        return 1;
    }
    if ( b.date.year === null || b.date.year === '' ){
        return -1;
    }
    if ( a.date.year ===  b.date.year ){
        return 0;
    }
    return parseInt(a.date.year, 10) < parseInt(b.date.year, 10) ? 1 : -1;
};

export function sortImagekitFileByDate( a, b ) {
    if ( a.date === null || a.date === '' ){
        return 1;
    }
    if ( b.date === null || b.date === '' ){
        return -1;
    }
    if ( a.date ===  b.date ){
        return 0;
    }
    return parseInt(a.date, 10) < parseInt(b.date, 10) ? 1 : -1;
};

export function articleContent( title, date, description ) {
    if ( title && description && date ){
        return (<div>
                    <span style={{ fontWeight: 600}} >{`${title}. `}</span> 
                    <span style={{ fontWeight: 400}} >{`${description}. `}</span>
                    <span style={{ fontWeight: 400}} >{`${date}.`}</span>
                </div>); 
    }
    if ( title && date ){
        return (<div>
                    <span style={{ fontWeight: 600}} >{`${title}. `}</span> 
                    <span style={{ fontWeight: 400}} >{`${date}.`}</span>
                </div>); 
    } else {
        return (<div>
                    <span style={{ fontWeight: 600}} >{`${title} `}</span> 
                    {/* <span style={{ fontWeight: 400}} >{`${date}`}</span> */}
                </div>); 
    }
};

export function articleAuthors( technique, category = null ) {   
    if ( technique && category ) {
        return (<span ><i>{technique}</i> | <b>{category}</b></span> );      
    } if ( technique ) {
        return (<span ><i>{technique}</i></span> );      
    } else 
        return ''; 
};

export function videoContent( title, date, description ) {
    if ( title && description && date ){
        return (<div>
                    <span style={{ fontWeight: 600}} >{`${title}. `}</span> 
                    <span style={{ fontWeight: 400}} >{`${description}. `}</span>
                    <span style={{ fontWeight: 400}} >{`${date}.`}</span>
                </div>); 
    }
    if ( title && date ){
        return (<div>
                    <span style={{ fontWeight: 600}} >{`${title}. `}</span> 
                    <span style={{ fontWeight: 400}} >{`${date}.`}</span>
                </div>); 
    } else {
        return (<div>
                    <span style={{ fontWeight: 600}} >{`${title} `}</span> 
                    <span style={{ fontWeight: 400}} >{`${date}`}</span>
                </div>); 
    }
};

export function mainImageLayout(divsize, size, image) {
    if(!image)
        return null;
    if(divsize.width <= 830) {
        const hCoef = ((size.height*7)/12 - 48)/image.height;
        const wCoef = (size.width - 24)/image.width;

        if(hCoef < wCoef) {
            return { h: image.height*hCoef, w: image.width*hCoef };
        } else {
            return { h: image.height*wCoef, w: image.width*wCoef };
        };
    } if(830 < divsize.width && divsize.width <= 1536) {
        const hCoef = (size.height - 48)/image.height;
        const wCoef = ((size.width*7)/12 - 24)/image.width;

        if(hCoef < wCoef) {
            return { h: image.height*hCoef, w: image.width*hCoef };
        } else {
            return { h: image.height*wCoef, w: image.width*wCoef };
        };
    } else {
        const hCoef = (size.height - 48)/image.height;
        const wCoef = (1328 - 24)/image.width;

        if(hCoef < wCoef) {
            return { h: image.height*hCoef, w: image.width*hCoef };
        } else {
            return { h: image.height*wCoef, w: image.width*wCoef };
        };
    };
};

export function mainVideoLayout(divsize, size) {
    if(divsize.width <= 1536) {
        const hCoef = (size.height - 48)/315;
        const wCoef = (size.width - 48)/560;

        if(hCoef < wCoef) {
            return { h: 315*hCoef, w: 560*hCoef };
        } else {
            return { h: 315*wCoef, w: 560*wCoef };
        };
    } else {
        const hCoef = (size.height - 48)/315;
        const wCoef = (1328 - 48)/560;

        if(hCoef < wCoef) {
            return { h: 315*hCoef, w: 560*hCoef };
        } else {
            return { h: 315*wCoef, w: 560*wCoef };
        };
    };
};

export function featuredImageLayout(divsize, size, image) {
    if(!image)
        return null;
    if(divsize.width <= 1536) {
        const hCoef = (size.height - 48)/image.height;
        const wCoef = (size.width - 48)/image.width;

        if(hCoef < wCoef) {
            return { h: image.height*hCoef, w: image.width*hCoef };
        } else {
            return { h: image.height*wCoef, w: image.width*wCoef };
        };
    } else {
        const hCoef = (size.height - 48)/image.height;
        const wCoef = (1328 - 48)/image.width;

        if(hCoef < wCoef) {
            return { h: image.height*hCoef, w: image.width*hCoef };
        } else {
            return { h: image.height*wCoef, w: image.width*wCoef };
        };
    };
};

export function contentEditImageGridLayout(size, imgcount, imgsize, gap) {

    const width = size.width;
    
    if(width < 1456) {
        const cols = Math.floor((width)/(imgsize+gap));
        const rows = Math.ceil(imgcount/cols);
        const gridWidth = cols*imgsize + (cols-1)*gap;

        return { width: gridWidth, rows: rows, cols: cols, imgSize: imgsize, imgGap: gap };
    } else {
        const cols = Math.floor((1456)/(imgsize+gap));
        const rows = Math.ceil(imgcount/cols);
        const gridWidth = cols*imgsize + (cols-1)*gap;

        return { width: gridWidth, rows: rows, cols: cols, imgSize: imgsize, imgGap: gap };
    };
};

export function imageGridLayout(divsize, size, imgcount, imgsize, gap) {

    const divwidth = divsize.width;

    if(divwidth <= 830) {
        const width = size.width;
        const cols = Math.floor((width - 48)/(imgsize+gap)); //24+24 FROM SIDE GRID PADDING
        const rows = Math.ceil(imgcount/cols);
        const gridWidth = cols*imgsize + (cols-1)*gap;

        return { width: gridWidth, rows: rows, cols: cols, imgSize: imgsize, imgGap: gap };
    } if(830 < divwidth && divwidth <= 1536) {
        const width = (size.width*5)/12;
        const cols = Math.floor((width - 24)/(imgsize+gap)); //24 FROM SIDE GRID PADDING
        const rows = Math.ceil(imgcount/cols);
        const gridWidth = cols*imgsize + (cols-1)*gap;

        return { width: gridWidth, rows: rows, cols: cols, imgSize: imgsize, imgGap: gap };
    } else {
        const width = (1328*5)/12;
        const cols = Math.floor((width - 24)/(imgsize+gap)); //24 FROM SIDE GRID PADDING
        const rows = Math.ceil(imgcount/cols);
        const gridWidth = cols*imgsize + (cols-1)*gap;

        return { width: gridWidth, rows: rows, cols: cols, imgSize: imgsize, imgGap: gap };
    };
};

export function imageDialogLayout(width, height, image) {
    const hCoef = height/image.height;
    const wCoef = width/image.width;
    if(hCoef < wCoef) {
        return { h: image.height*hCoef, w: image.width*hCoef };
    } else {
        return { h: image.height*wCoef, w: image.width*wCoef };
    };
};

export function videoDialogLayout(width, height) {
    const hCoef = height/540;
    const wCoef = width/960;
    if(hCoef < wCoef) {
        return { h: 540*hCoef, w: 960*hCoef };
    } else {
        return { h: 540*wCoef, w: 960*wCoef };
    };
};

export function adminVideoDialogLayout(width, height) {
    const hCoef = height/315;
    const wCoef = width/560;
    if(hCoef < wCoef) {
        return { h: 315*hCoef, w: 560*hCoef };
    } else {
        return { h: 315*wCoef, w: 560*wCoef };
    };
};

export function statusColorName(id) {
    if(id === 1)
        return 'success.main';
    if(id === 2)
        return 'warning.main';
    if(id === 3)
        return 'error.main'
    else
        return 'error.main';  
}; 

export function contentCounter(content = [], sectionid) { 
    let relatedcontent = content.filter(c => c.section_id === sectionid) || null;
    if(relatedcontent.length) {
        if(relatedcontent.length === 1)
            return `${relatedcontent.length} item`;
        else
            return `${relatedcontent.length} itens`;     
    }
    else
        return 'Sem Registros'; 
};

export function getContentCategoriesNames(contentcategories, categories, id) {
    const contentCategoriesIds = contentcategories 
        .filter(cc => cc.content_id === id )
        .map(c => {return c.category_id} ); 
    const contentCategoriesNames = categories
        .filter(cc => contentCategoriesIds.includes(cc.id))
        .map(cco => cco.name);
    
    return contentCategoriesNames;
};

export function getContentName(content, contentid) {
    const videoContent = content.find(c => c.id === contentid);
    if(videoContent?.title !== undefined)
        return videoContent.title;
    else 
        return '';
};

export function getRelatedContentName(content, contentarticles, fileid) {
    const relatedContentId = contentarticles.find(ca => ca.file_id === fileid)?.content_id ;
    const articleContent = content.find(c => c.id === relatedContentId);
    if(articleContent?.title !== undefined)
        return articleContent.title;
    else 
        return '';
};

export function truncate(str, max = 10) {
    if(str !== null && str !== undefined) {
        const array = str.trim().split(' ');
        const ellipsis = array.length > max ? '...' : '';

        return array.slice(0, max).join(' ') + ellipsis;
    } else 
        return '';
};

export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

export  const validatePassword = (str) => {
    if(str.length < 6)
        return true;
    else
        return false;
};

export const emailError = (str) => {
    if(!validateEmail(str) && str.length > 0)
        return true;
    else
        return false;
};

export const confirmPassword = (pass, password) => {
    if(pass === password && pass.length > 5)
      return null;
    else
      return true;
};

export const validateNames = (str) => {
    if(str === null || str === undefined)
        return true;
    if(str.replace(/\s+/g,"").length < 2)
      return true;
    else
      return false;
};

export const validateYouTubeVideoId = (videoId) => {
    const regex = /^[A-Za-z0-9_-]{11}$/;
    return regex.test(videoId);
};

// VALIDATE FIELDS IN SectionsEdit.js TODO: UNIFY VALIDATION FUNCTIONS
export const validateName = (str) => {
    return str.match(/^[a-zA-Z\u00C0-\u00FF][a-zA-Z\u00C0-\u00FF\s]*$/);
};

export const nameError = (str) => {
    if(!validateName(str) && str.length > 0)
        return true;
    else
        return false;
};

// FIND ID BY ROW SELECTED ON ImagekitEditableTable
export const findById = (array, id) => {
    return array.findIndex(d => d.fileId === id);
};

// FIND ID BY ROW SELECTED ON VideoEditableTable
export const findByVideoId = (array, id) => {
    return array.findIndex(d => d.id === id);
};

export const sliceUniqueFileString = (str) => {
    if(typeof str === 'string') {
        const length = str.length;
        const last = length - 15;
        const extension = str.slice(-4);
        const prefix = str.slice(0, last);
        return [prefix, extension].join('');
    } else {
        return '';
    };
};

export const uppySetter = (path) => {
    if(path === 'contentarticles') {
        return { uppyId: 'uppyArticles', uppyTrigger: 'uppyArticlesDashboard', folder: '/articles', buttonTitle: 'Adicionar Bibliografia' };
    } if(path === 'contentauthorarticles') {
        return { uppyId: 'uppyAuthorArticles', uppyTrigger: 'uppyAuthorArticlesDashboard', folder: '/authorarticles', buttonTitle: 'Adicionar Textos da Artista' };
    } if(path === 'contentcatalogues') {
        return { uppyId: 'uppyCatalogues', uppyTrigger: 'uppyCataloguesDashboard', folder: '/catalogues', buttonTitle: 'Adicionar Publicações' };
    } else {
        return { uppyId: 'uppyClipping', uppyTrigger: 'uppyClippingDashboard', folder: '/clipping', buttonTitle: 'Adicionar Clipping' };
    };
};

export const folderSetter = (path) => {
    if(path === 'contentarticles') {
        return 'articles';
    } if(path === 'contentauthorarticles') {
        return 'authorarticles';
    } if(path === 'contentcatalogues') {
        return 'catalogues';
    } else {
        return 'clipping';
    };
};

export const buttonArticleIndexSetter = (path) => {
    if(path === 'contentarticles') {
        return 'Editar Bibliografias';
    } if(path === 'contentauthorarticles') {
        return 'Editar Textos da Artista';
    } if(path === 'contentcatalogues') {
        return 'Editar Publicações';
    } else {
        return 'Editar Informações das Imagens';
    };
};

export const fitImageToContainer = (imgWidth,imgHeight,containerWidth,containerHeight) => {
    const imgWidthByContainerHeight = containerHeight/imgHeight*imgWidth;
    const imgHeightByContainerHeight = containerHeight;
    const imgWidthByContainerWidth = containerWidth;
    const imgHeightByContainerWidth = containerWidth/imgWidth*imgHeight;
    if(imgWidthByContainerHeight <= containerWidth) 
        return { h: imgHeightByContainerHeight, w: imgWidthByContainerHeight };
    else 
        return { h: imgHeightByContainerWidth, w: imgWidthByContainerWidth };
}; 

export function truncateUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.protocol}//${parsedUrl.hostname}`;
  } catch (error) {
    // se a URL for inválida, retorna a string original ou string vazia
    return url || '';
  }
}