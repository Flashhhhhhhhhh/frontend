import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Icon } from '../../';
import Item from './item';
import Column from './column';
import Spacer from './spacer';
import Truncate from './truncate';
import Preview from './preview';
import constants from '../../constants';
import * as Actions from '../../../popups/actions';

const { color } = constants;

const Container = styled.div`
   border-top: 1px solid ${color.gray[3]};
`;

class Explorer extends Component {
   render() {
      const { id, data, path, onChange, hideOptions } = this.props;

      return (
         <Container
            id={id}
            style={{
               display: 'flex',
               overflowX: 'auto',
            }}>
            <ConnectedRecursiveExplorer
               key={data}
               data={data}
               fullData={data}
               hideOptions={hideOptions}
               leadingPath={path}
               onChange={onChange}
            />
         </Container>
      );
   }
}

const mapDispatchToProps = dispatch => ({
   pushPopup: popup => dispatch(Actions.pushPopup(popup)),
});

const RecursiveExplorer = ({
   data,
   fullData,
   leadingPath,
   trailingPath,
   hideOptions,
   onChange,
   pushPopup,
}) => {
   if (Array.isArray(data)) {
      return (
         <Column index={10}>
            <Preview data={data} />
         </Column>
      );
   }

   const setupOptionsMenu = (e, name) => {
      pushPopup({
         name: 'Options',
         props: {
            mousePos: { x: e.screenX, y: e.screenY },
            options: [
               {
                  label: 'Move',
                  icon: 'move',
                  onClick: () =>
                     pushPopup({
                        name: 'ItemMover',
                        props: {
                           data: fullData,
                           leadingPath,
                           trailingPath,
                           item: name,
                        },
                     }),
               },
               {
                  label: 'Rename',
                  icon: 'edit',
               },
               {
                  label: 'Lock',
                  icon: 'lock',
               },
               {
                  label: 'Delete',
                  icon: 'trash',
               },
            ],
         },
      });
   };

   const prettify = str => {
      return str.replace(/(_|^)([^_]?)/g, function(_, prep, letter) {
         return (prep && ' ') + letter.toUpperCase();
      });
   };

   return (
      <React.Fragment>
         <Column index={trailingPath.length}  key={data} showPlus tag={data.tag}>
            {Object.keys(data).map(name => {
               const isSelected = name === leadingPath[0];
               return (
                  name === 'tag' || (
                     <Item
                        key={name}
                        isSelected={isSelected}
                        onClick={() => onChange(trailingPath.concat(name))}>
                        <Truncate>{prettify(name)}</Truncate>
                        <Spacer />
                        {hideOptions || (
                           <Icon
                              className="options-button"
                              name="more-horizontal"
                              size={20}
                              color={isSelected ? 'white' : color.gray[5]}
                              onClick={e => setupOptionsMenu(e, name)}
                           />
                        )}
                        {Array.isArray(data[name]) ? null : (
                           <Icon
                              name="chevron-right"
                              size={20}
                              color={isSelected ? 'white' : color.gray[5]}
                           />
                        )}
                     </Item>
                  )
               );
            })}
         </Column>
         {leadingPath.length > 0 ? (
            <ConnectedRecursiveExplorer
               fullData={fullData}
               data={data[leadingPath[0]]}
               leadingPath={leadingPath.slice(1)}
               trailingPath={trailingPath.concat(leadingPath.slice(0, 1))}
               hideOptions={hideOptions}
               onChange={onChange}
            />
         ) : null}
      </React.Fragment>
   );
};

const ConnectedRecursiveExplorer = connect(
   null,
   mapDispatchToProps,
)(RecursiveExplorer);

RecursiveExplorer.defaultProps = {
   trailingPath: [],
};

export default Explorer;
