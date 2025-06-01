import * as React from 'react';
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateImage } from '../features/imagesSlice';
import Switch from '@mui/material/Switch';
// REACT DATA TABLE COMPONENT
import DataTable from 'react-data-table-component';
import { customStyles } from '../styles/tableTemplatesStyles'
import { findById, sliceUniqueFileString } from '../utils';

const ImagekitEditableTable = ( props ) => {

    const { title, stateData, folder } = props; 

    // IMAGEKIT
    const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT; 
    const imgSize = 70;

    // REDUX DISPATCH
    const dispatch = useDispatch();    

    // REACT STATES
    const [data, setData] = useState(stateData);    

    const columns = useMemo(() => {

        // HANDLE TABLE TEXT FIELDS EDIT 
        const handleTitleEditable = (field) => (row) => (e) => {
            const newRow = { ...row }; 
            newRow[field] = e.target.innerText;
            const newData = data.slice(0);
            newData[findById(data, row.fileId)] = newRow;

            const customMetaData = {
                title: newRow.title,
                description: newRow.description,
                date: newRow.date,
                technique: newRow.technique,
                dimensions: newRow.dimensions,
                serial: newRow.serial,
                available: newRow.available,
            }; 

            const imageObj = {
                fileid: newRow.fileId,
                folder: folder,
                customMetaData: customMetaData
            };

            dispatch(updateImage(imageObj));
            setData(newData);            
        };

        // HANDLE IMAGE EDIT
        const handleUpdateAvailableCheck = (e) => {
            const image = data.find(d => d.fileId === e.target.id);
            const imageCustomMetaData = {
                title: image.title,
                description: image.description,
                date: image.date,
                technique: image.technique,
                dimensions: image.dimensions,
                serial: image.serial,
                available: e.target.checked
            }; 
            const imageObj = {
                fileid: image.fileId,
                folder: image.folder,
                customMetaData: imageCustomMetaData
            };
            const newData = data.map(d => {
                if(d.fileId === e.target.id)
                    return {...image, available: e.target.checked};
                else
                    return d;
            });

            setData(newData);
            dispatch(updateImage(imageObj));
        };

        return [
            {
                id: 99,
                name: "ID",
                selector: row => row.fileId ,
                sortable: true,
                omit: true,
                width: '70px',
            },
            {
                id: 97,
                name: "Imagem", 
                selector: row => row.url,
                sortable: true,
                reorder: true,
                cell: (row) => ( row.mime === "application/pdf" ? (
                        <div
                            style={{ fontWeight: 600, color: 'indianred' }}
                        >
                            {sliceUniqueFileString(row.name)}
                        </div>                    
                    ) : (
                        <div 
                            style={{ paddingTop: "5px", paddingBottom: "5px" }} 
                            //onClick={() => handleDialogOpen(row)}
                        >
                            <img 
                                style={{ borderStyle: "outset"}}
                                src={`${urlEndpoint}/tr:h-${imgSize},w-${imgSize}${row.filePath}?w=${imgSize}&h=${imgSize}&fit=crop&auto=format`}           
                                srcSet={`${urlEndpoint}/tr:h-${imgSize},w-${imgSize}${row.filePath}?w=${imgSize}&h=${imgSize}&fit=crop&auto=format&dpr=2 2x`}
                                alt={row.description}
                                loading="lazy"
                            />
                        </div>
                    )
                ),
                //omit: folder === 'articles' ? true : (folder === 'clipping' ? true : false),
                grow: '3',
            },
            {
                id: 6,
                name: 'Ordem',
                selector: (row) => row.serial,
                sortable: true,
                right: true,
                reorder: true,
                omit: folder === 'articles' ? true : (folder === 'clipping' ? true : false),
                cell: (row) => (
                    <div
                        //contentEditable
                        contentEditable="plaintext-only"
                        suppressContentEditableWarning={true}
                        onBlur={handleTitleEditable("serial")(row)}
                        style={{ padding: '5px', marginTop: '5px', marginBottom: '5px',  borderRadius: '12px', backgroundColor: 'lightgreen' }}
                    >
                        {row.serial}
                    </div>
                ),
                grow: 0.5,
            },   
            {
                id: 1,
                name: "Título",
                selector: (row) => row.title,
                omit: true,
                //sortable: true,
                //reorder: true,
                cell: (row) => (
                    <div
                        //contentEditable
                        contentEditable="plaintext-only"
                        suppressContentEditableWarning={true}
                        onBlur={handleTitleEditable("title")(row)}
                        style={{ padding: '5px', marginTop: '5px', marginBottom: '5px',  borderRadius: '12px', backgroundColor: 'lightgreen' }}
                    >
                        {row.title}
                    </div>
                ),
                grow: 2,
            },
            {
                id: 2,
                name: "Descrição",
                selector: (row) => row.description,
                sortable: true,
                reorder: true,
                cell: (row) => (
                    <div
                        //contentEditable
                        contentEditable="plaintext-only"
                        suppressContentEditableWarning={true}
                        onBlur={handleTitleEditable("description")(row)}
                        style={{ padding: '5px', marginTop: '5px', marginBottom: '5px',  borderRadius: '12px', backgroundColor: 'lightgreen' }}
                    >
                        {row.description}
                    </div>
                ),
                grow: 10,
            },
            {
                id: 3,
                name: "Ano",
                selector: (row) => row.date,
                //sortable: true,
                omit: true,
                right: true,
                //reorder: true,
                cell: (row) => (
                    <div
                        //contentEditable
                        contentEditable="plaintext-only"
                        suppressContentEditableWarning={true}
                        onBlur={handleTitleEditable("date")(row)}
                        style={{ padding: '5px', marginTop: '5px', marginBottom: '5px',  borderRadius: '12px', backgroundColor: 'lightgreen' }}
                    >
                        {row.date}
                    </div>
                ),
                grow: 1,
            },
            {
                id: 4,
                name: folder === 'articles' || folder === 'clipping' ? 'Autor' : 'Link',
                selector: (row) => row.technique,
                sortable: true,
                //right: true,
                reorder: true,
                cell: (row) => (
                    <div
                        //contentEditable
                        contentEditable="plaintext-only"
                        suppressContentEditableWarning={true}
                        onBlur={handleTitleEditable("technique")(row)}
                        style={{ padding: '5px', marginTop: '5px', marginBottom: '5px',  borderRadius: '12px', backgroundColor: 'lightgreen' }}
                    >
                        {row.technique}
                    </div>
                ),
                grow: 10,
            },
            {
                id: 5,
                name: folder === 'articles' || folder === 'clipping' ? 'Dimensões' : 'Categoria',
                selector: (row) => row.dimensions,
                //sortable: true,
                omit: true,
                right: true,
                //reorder: true,
                cell: (row) => (
                    <div
                        //contentEditable
                        contentEditable="plaintext-only"
                        suppressContentEditableWarning={true}
                        onBlur={handleTitleEditable("dimensions")(row)}
                        style={{ padding: '5px', marginTop: '5px', marginBottom: '5px',  borderRadius: '12px', backgroundColor: 'lightgreen' }}
                    >
                        {row.dimensions}
                    </div>
                ),
                grow: 3,
            },         
            {
                id: 7,
                name: "Disponível",
                selector: (row) => row.available,
                //sortable: true,
                omit: true,
                right: true,
                //reorder: true,
                cell: row => <Switch 
                                checked={row.available} 
                                id={row.fileId}
                                onChange={(event) => handleUpdateAvailableCheck(event)}
                                inputProps={{ 'aria-label': 'Obra disponível para compra' }} 
                                size="small" 
                                color="success"
                            />,


                // omit: folder === 'articles' || 
                // folder === 'clipping' || 
                // folder === 'authorarticles' || 
                // folder === 'catalogues' ? true : false,
                omit: true,
                grow: 2,
            },
        ];
    }, [data, dispatch]);

    if(title) {
        return( 
            <DataTable
                title={title}
                columns={columns}
                data={data}
                customStyles={customStyles}
                paginationComponentOptions={{
                    rowsPerPageText: 'Linhas por página:',
                }}
                striped
                responsive
                pagination
                persistTableHead
            />              
        );
    } else {
        return (
            <DataTable
                columns={columns}
                data={data}
                customStyles={customStyles}
                paginationComponentOptions={{
                    rowsPerPageText: 'Linhas por página:',
                }}
                striped
                responsive
                pagination
                persistTableHead
            />
        );
    }
   
};

export default ImagekitEditableTable;

ImagekitEditableTable.defaultProps = {
    folder: 'articles',
};

ImagekitEditableTable.propTypes = {
    title: PropTypes.node.isRequired,
    stateData: PropTypes.array.isRequired,
    isArticle: PropTypes.string,
};