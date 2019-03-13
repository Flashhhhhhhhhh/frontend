import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as PopupActions from '../../popups/actions';
import * as ApiActions from '../../api/actions';

const Container = styled.div`
   z-index: 1;
   position: fixed;
   display: flex;
   align-items: center;
   top: 0;
   right: 0;
   margin: 1em;
   padding: 4px 4px 4px 4px;
   height: 2em;
   border-radius: 50px;
   cursor: pointer;
   transition: all 0.3s;

   :hover {
      background: white;
      padding: 4px 16px 4px 4px;

      h3 {
         color: #828d97;
      }
   }
`;

const Text = styled.h3`
   font-size: 15px;
   margin: 0 0 0 8px;
   color: white;
   font-weight: 400;
   right: 0;
   transition: all 0.45s;
`;

const AvatarContainer = styled.div`
   background: white;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 50%;
   height: 32px;
   width: 32px;
`;

const Avatar = styled.img``;

class UserSelect extends Component {
   selectUser = () => {
      this.props.pushPopup({
         name: 'UserSelector',
         props: {}
      })
   }

   render() {
      const { apiState } = this.props;
      console.log(apiState);
      const { user } = apiState;
      const { username } = user;

      return (
         <Container onClick={this.selectUser}>
            <AvatarContainer>
               <Avatar src="images/user.svg" />
            </AvatarContainer>
            <Text>{username || 'Log in'}</Text>
         </Container>
      );
   }
}

const mapStateToProps = state => {
   return {
      apiState: state.apiState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushPopup: popup => dispatch(PopupActions.pushPopup(popup)),
      updateUser: user => dispatch(ApiActions.updateUser(user)),
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(UserSelect);
