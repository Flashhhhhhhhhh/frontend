import React from 'react';
import styled, { css } from 'styled-components';
import constants from '../../constants';
import Icon from '../icon';

const { color } = constants;

const Container = styled.div`
   display: flex;
   height: 1em;
   border-radius: 4px;
   padding: 12px 32px;
   cursor: pointer;
   margin-right: 0.5em;

   :active {
      background: ${color.gray[1]};
   }

   :last-child {
      margin-right: 0;
   }

   ${props => props.selected && css`
      background: ${color.blue[4]};

      h2 {
         color: white !important;
      }
   `}

   ${props => props.theme === 'list' && css`
      min-height: 48px;
      border-radius: 0;
      padding: 0 8px;
      margin-right: 0;
      border-bottom: 1px solid ${color.gray[3]};
   `};

   ${props => props.theme === 'primary' && css`
      background: ${color.blue[4]};
      border: 1px solid transparent;

      :active {
         background: ${color.blue[5]};
      }
   `};

   ${props => props.theme === 'secondary' && css`
      border: 1px solid ${color.gray[4]};
   `};
`;

const TextContainer = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   justify-content: center;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;

   h2,
   h4 {
      font-weight: normal;
      color: ${props => props.isSelected ? 'white' : 'black'};
      user-select: none;
   }

   ${props => props.theme === "primary" && css`
      h2, h4 {
         color: white;
         font-weight: 800;
         margin-left: 0;
      }
   `};

   ${props => props.theme === "secondary" && css`
      h2, h4 {
         margin-left: 0;
      }
   `};
`;

const Label = styled.h2`
   margin: 0;
   font-size: 1rem;
   margin-left: 16px;
`;

const SubLabel = styled.h4`
   margin: 0;
`;

const IconContainer = styled.div`
   height: 3em;
   width: 3em;
   display: flex;
   justify-content: flex-end;
   align-items: center;
`;

const Button = ({
   index,
   theme,
   label,
   sublabel,
   showIndex,
   isSelected,
   onClick,
   selected,
   chevron,
   locked,
   unlocked,
   onLockToggle,
}) => {
   return (
      <Container onClick={onClick} selected={selected} theme={theme}>
         <TextContainer isSelected={isSelected} theme={theme}>
            <Label className="label">{label}</Label>
            {sublabel && <SubLabel>{sublabel}</SubLabel>}
         </TextContainer>
         { (locked || unlocked || chevron) && 
            <IconContainer>
               {locked && (
                  <Icon name="lock" color={selected ? 'white' : color.gray[6]} size={20} onClick={onLockToggle} />
               )}
               {unlocked && (
                  <Icon name="unlock" color={selected ? 'white' : color.gray[6]} size={20} onClick={onLockToggle} />
               )}
               {chevron && (
                  <Icon name="chevron-right" color={selected ? 'white' : color.gray[4]} size={25} />
               )}
            </IconContainer>
         }
      </Container>
   );
};

Button.defaultProps = {
   theme: 'secondary',
   label: 'Button',
   locked: false,
   unlocked: false,
   isSelected: false,
   onClick: () => { },
   onLockToggle: () => { },
}

export default Button;
