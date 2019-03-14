import React, { Component } from 'react';
import styled from 'styled-components';
import constants from '../../constants';

const { color } = constants;

const Container = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   padding: 12px 0;
   box-sizing: border-box;
`;

const Pupper = styled.div`
   box-sizing: border-box;

   img {
      max-width: 100%;
      max-height: 8em;
      border-radius: 4px;
   }
`;

const Title = styled.h3`
   text-align: center;
   font-weight: bold;
   border-bottom: 1px solid ${color.gray[3]};
   padding-bottom: 16px;
`;

const Subtitle = styled.h3`
   font-weight: 300;
   border-bottom: 1px solid ${color.gray[3]};
   padding-bottom: 16px;
`;

const TextContainer = styled.div`
   width: 80%;
   margin: 0 auto;
   text-align: left;
`;

const Text = styled.h3`
   width: 80%;
   margin: 0;
   font-weight: 300;
`;

const prettify = str => {
   return str.replace(/(_|^)([^_]?)/g, function(_, prep, letter) {
      return (prep && ' ') + letter.toUpperCase();
   });
};

class Preview extends Component {
   render() {
      const { data, path } = this.props;
      const category = prettify(path[path.length - 2]);
      const value = path[path.length - 1];

      return (
         <Container>
            <Pupper>
               <img alt="pupper" src="images/data_icon.svg" />
            </Pupper>
            <TextContainer>
               <Title>{category}</Title>
               <Subtitle>Value: <b>{value}</b></Subtitle>
               <Subtitle><em>From healthcare.csv</em></Subtitle>
            </TextContainer>
            {data.map(
               item =>
                  item && <Text key={item.value}>{item && item.value}</Text>,
            )}
         </Container>
      );
   }
}

export default Preview;
