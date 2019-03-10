import React, { Component } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { Icon } from "../../";
import Item from "./item";
import Column from "./column";
import Spacer from "./spacer";
import Truncate from "./truncate";
import Preview from "./preview";
import constants from "../../constants";
import * as Actions from "../../../popups/actions";

const { color } = constants;

const Container = styled.div`
   border-top: 1px solid ${color.gray[3]};
`;

class Explorer extends Component {
   render() {
      const { id, data, path, onChange, width, height } = this.props;

      return (
         <Container
            id={id}
            style={{
               display: "flex",
               width,
               height,
               overflowX: "auto"
            }}
         >
            <ConnectedRecursiveExplorer
               key={data}
               data={data}
               fullData={data}
               leadingPath={path}
               onChange={onChange}
            />
         </Container>
      );
   }
}

Explorer.defaultProps = {
   width: "100%",
   height: "100%"
};

const mapDispatchToProps = dispatch => ({
   pushPopup: popup => dispatch(Actions.pushPopup(popup))
});

const RecursiveExplorer = ({
   data,
   fullData,
   leadingPath,
   trailingPath,
   onChange,
   pushPopup
}) => {
   if (Array.isArray(data)) {
      return (
         <Column>
            <Preview data={data} />
         </Column>
      );
   }

   const setupOptionsMenu = (e, name) => {
      pushPopup({
         name: "Options",
         props: {
            mousePos: { x: e.screenX, y: e.screenY },
            options: [
               {
                  label: "Move",
                  icon: "move",
                  onClick: () => pushPopup({
                     name: "ItemMover",
                     props: {
                        data: fullData,
                        leadingPath,
                        trailingPath,
                        item: name
                     }
                  })
               },
               {
                  label: "Rename",
                  icon: "edit"
               },
               {
                  label: "Lock",
                  icon: "lock"
               },
               {
                  label: "Delete",
                  icon: "trash"
               }
            ]
         }
      });
   };

   return (
      <React.Fragment>
         <Column key={data} showPlus tag={data.tag}>
            {Object.keys(data).map(name => {
               const isSelected = name === leadingPath[0];
               return name === 'tag' || name === 'id' || (
                  <Item
                     key={name}
                     isSelected={isSelected}
                     onClick={() => onChange(trailingPath.concat(name))}
                  >
                     <Truncate>{name}</Truncate>
                     <Spacer />
                     <Icon
                        className="options-button"
                        name="more-horizontal"
                        size={20}
                        color={isSelected ? "white" : color.gray[5]}
                        onClick={e => setupOptionsMenu(e, name)}
                     />
                     {Array.isArray(data[name]) ? null : (
                        <Icon
                           name="chevron-right"
                           size={20}
                           color={isSelected ? "white" : color.gray[5]}
                        />
                     )}
                  </Item>
               );
            })}
         </Column>
         {leadingPath.length > 0 ? (
            <ConnectedRecursiveExplorer
               fullData={fullData}
               data={data[leadingPath[0]]}
               leadingPath={leadingPath.slice(1)}
               trailingPath={trailingPath.concat(leadingPath.slice(0, 1))}
               onChange={onChange}
            />
         ) : null}
      </React.Fragment>
   );
};

const ConnectedRecursiveExplorer = connect(
   null,
   mapDispatchToProps
)(RecursiveExplorer);

RecursiveExplorer.defaultProps = {
   trailingPath: []
};

export default Explorer;
