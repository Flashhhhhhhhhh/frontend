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
      const { id, data, path, onChange, hiddenItem, hideOptions } = this.props;

      return (
         <Container
            id={id}
            style={{
               display: 'flex',
               flex: 1,
               overflowX: 'auto',
            }}>
            <ConnectedRecursiveExplorer
               key={data}
               data={data}
               fullData={data}
               hiddenItem={hiddenItem}
               hideOptions={hideOptions}
               leadingPath={path}
               onChange={onChange}
            />
         </Container>
      );
   }
}

const mapStateToProps = state => ({
   apiState: state.apiState,
});

const mapDispatchToProps = dispatch => ({
   pushPopup: popup => dispatch(Actions.pushPopup(popup)),
});

const RecursiveExplorer = ({
   data,
   apiState,
   fullData,
   leadingPath,
   trailingPath,
   hiddenItem,
   hideOptions,
   onChange,
   pushPopup,
}) => {
   if (Array.isArray(data)) {
      return (
         <Column index={10}>
            <Preview path={trailingPath} data={data} />
         </Column>
      );
   }

   const setupOptionsMenu = (e, name) => {
      const { user } = apiState;

      pushPopup({
         name: 'Options',
         props: {
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
                           hiddenItem: name,
                           item: name,
                        },
                     }),
               },
               {
                  label: 'Rename',
                  icon: 'edit',
                  onClick: () =>
                     pushPopup({
                        name: 'Renamer',
                        props: {
                           data: fullData,
                           leadingPath,
                           trailingPath,
                           item: name,
                        },
                     }),
               },
               ...(user.username === 'admin'
                  ? [
                       {
                          label: 'Change Permissions',
                          icon: 'lock',
                          onClick: () =>
                             pushPopup({
                                name: 'PermissionsSelector',
                                props: {
                                   data: fullData,
                                   leadingPath,
                                   trailingPath,
                                   item: name,
                                },
                             }),
                       },
                    ]
                  : []),
               {
                  label: 'Delete',
                  icon: 'trash',
                  onClick: () =>
                     pushPopup({
                        name: 'DirDeleter',
                        props: {
                           data: fullData,
                           leadingPath,
                           trailingPath,
                           item: name,
                        },
                     }),
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
         <Column
            path={trailingPath}
            index={trailingPath.length}
            key={data}
            showPlus={!hideOptions}
            tag={data.tag}>
            {Object.keys(data).sort().map(name => {
               const isSelected = name === leadingPath[0];
               const isLocked =
                  data[name].tag && data[name].tag[0]['sensitive'];
               const isAdmin = apiState.user.username === 'admin';

               return (
                  name === 'tag' || name === hiddenItem || (
                     <Item
                        key={name}
                        isSelected={isSelected}
                        onClick={() =>
                           (isAdmin || !isLocked) &&
                           onChange(trailingPath.concat(name))
                        }>
                        <Truncate>{prettify(name)}</Truncate>
                        {isLocked && (
                           <Icon
                              className="lock-icon"
                              name="lock"
                              size={20}
                              color={isSelected ? 'white' : color.gray[5]}
                              onClick={null}
                           />
                        )}
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
                        {(!isAdmin && isLocked) ||
                        Array.isArray(data[name]) ? null : (
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
               hiddenItem={hiddenItem}
               hideOptions={hideOptions}
               onChange={onChange}
            />
         ) : null}
      </React.Fragment>
   );
};

const ConnectedRecursiveExplorer = connect(mapStateToProps, mapDispatchToProps)(
   RecursiveExplorer,
);

RecursiveExplorer.defaultProps = {
   trailingPath: [],
};

export default Explorer;
