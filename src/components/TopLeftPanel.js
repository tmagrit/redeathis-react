import * as React from 'react';
import { useSelector } from 'react-redux';
import Title from './Title';

const TopLeftPanel = () => {

    // REDUX SELECTORS
    const section = useSelector(state => state.session.section);
    const context = useSelector(state => state.session.context);

    function titleGenerator(section, context) {
        
        // MAIN DASHBOARD TITLES 
        if(section === 'research' && context === '')
            return 'Síntese de Pesquisa';
        
        if(section === 'categories' && context === '')
            return 'Resumo de Categorias';

        if(section === 'members' && context === '')
            return 'Síntese de Colaboradores';
        
        if(section === 'pages' && context === '')
            return 'Resumo de Páginas';
    };

    return (
        <React.Fragment>
            <Title>{titleGenerator(section, context)}</Title>
        
        </React.Fragment>
    );
};

export default TopLeftPanel;