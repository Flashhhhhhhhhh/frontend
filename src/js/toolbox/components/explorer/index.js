import React, { Component } from "react";
import styled from "styled-components";
import Fuse from "fuse.js";
import Explorer from "./explorer";
import Search from "./search";
import { Button } from "../../";
import constants from "../../constants";
import { minBy } from "lodash";

const { color } = constants;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   height: ${props => props.height || "70vh"};
   width: ${props => props.width || "80%"};
   max-width: 70em;
   background: white;
   margin: 1em auto;
   padding: 0 16px 8px 16px;
   border-radius: 8px;
   overflow: hidden;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0.1) 0px 4px 16px;
`;

const ActionButtonContainer = styled.div`
   display: flex;
   justify-content: flex-end;
   height: 3em;
   padding: 12px 0 4px 0;
   border-top: 1px solid ${color.gray[3]};
`;

class ExplorerComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         path: [],
         canSelect: false
      };
   }

   createItemList = (tree, itemName = null, path = []) => {
      const item = {
         itemName,
         path,
         pathText: path.join(" ")
      };

      if (!tree) {
         // This is a leaf.
         return item;
      }

      const itemList = [];

      if (itemName) {
         // If this isn't the root node, include it in the list.
         itemList.push(item);
      }

      // Recursively create a list of items for each child.
      const childItems = Object.keys(tree).map(itemName => {
         const childTree = tree[itemName];
         const childPath = [...path, itemName];
         return this.createItemList(childTree, itemName, childPath);
      });

      // Flatten the lists together.
      return itemList.concat(...childItems);
   };

   search = str => {
      this.itemList = this.itemList || this.createItemList(this.props.data);

      const fuse = new Fuse(this.itemList, {
         keys: [
            {
               name: "itemName",
               weight: 0.3
            },
            {
               name: "pathText",
               weight: 0.7
            }
         ],
         includeScore: true,
         threshold: 0.4
      });
      const bestResult = minBy(
         fuse.search(str.trim()),
         result =>
            // Prefer more general categories (which have a smaller path length).
            result.score * (1 + 0.1 * result.item.path.length)
      );
      console.log(bestResult);

      return {
         path: bestResult ? bestResult.item.path : []
      };
   };

   updatePath = path => {
      const { id } = this.props;
      this.setState({
         path,
         leafSelected: this.checkForLeaf(path)
      });

      const el = document.getElementById(`explorer-${id}`);
      setTimeout(() => {
         el.scroll({
            top: 0,
            left: el.scrollWidth,
            behavior: "smooth"
         });
      }, 100);
   };

   checkForLeaf = path => {
      const { data } = this.props;
      if (!path.length) {
         return false;
      }

      let curSpot = data[path[0]];
      for (let item of path.slice(1)) {
         curSpot = curSpot[item];
      }

      return Array.isArray(curSpot);
   };

   handleSearch = text => {
      const searchResult = this.search(text);
      const { path } = searchResult;
      this.updatePath(path);
   };

   render() {
      const { id, width, height, nonLeafOnly } = this.props;
      const { leafSelected, path } = this.state;
      const curItem = path[path.length - 1];

      return (
         <Container width={width} height={height}>
            <Search onChange={this.handleSearch} />
            <Explorer
               id={`explorer-${id}`}
               data={this.props.data}
               path={this.state.path}
               onChange={this.updatePath}
            />
            <ActionButtonContainer>
               <Button
               disabled={nonLeafOnly ? !curItem || leafSelected : !leafSelected}
                  onClick={() => this.props.onChange(path)}
                  design="primary"
               >
                  Select
               </Button>
            </ActionButtonContainer>
         </Container>
      );
   }
}

ExplorerComponent.defaultProps = {
   nonLeafOnly: false,
   onChange: () => {}
}

export default ExplorerComponent;
