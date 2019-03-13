import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, constants } from '../../toolbox';
import * as PopupActions from '../../popups/actions';
import * as ApiActions from '../../api/actions';

const { color, animation } = constants;
const { scaleInBounce, scaleOutBounce } = animation;

const Container = styled.div`
   z-index: ${props => 100 + props.index};
   position: fixed;
   display: flex;
   justify-content: center;
   align-items: center;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
`;

const Cover = styled.div`
   z-index: 0;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   cursor: pointer;
   background: ${color.grayAlpha[5]};
   animation: ${props => (props.closing ? animation.fadeOut : animation.fadeIn)}
      0.3s ease-in-out;
`;

const Modal = styled.div`
   position: relative;
   height: 16em;
   width: 30em;
   max-width: 100%;
   max-height: 100%;
   background: white;
   padding: 24px;
   border-radius: 14px;
   animation: ${props => (props.closing ? scaleOutBounce : scaleInBounce)} 0.3s
      cubic-bezier(0.68, -0.55, 0.265, 1.55);
   overflow: hidden;
`;

const Header = styled.div`
   display: flex;
   align-items: center;
`;

const Title = styled.h2`
   margin: 0;
   font-weight: 900;
   font-size: 34px;
`;

const Subtitle = styled.h2`
   font-weight: 400;
   margin: 0;
   font-size: 24px;
   color: ${color.gray[8]};
`;

const Emoji = styled.h2`
   font-size: 50px;
   margin: 14px 24px 0 0;
`;

const TextInput = styled.input`
   -webkit-appearance: none;
   font-weight: 300;
   border: 0;
   padding: 8px;
   font-size: 1.35rem;
   border-radius: 4px;
   border: 1px solid ${color.gray[3]};
   outline: none;
   width: 100%;

   :last-child {
      margin-top: 12px;
   }
`;

const InputContainer = styled.div`
   margin: 15px 74px 0;
`;

const ButtonContainer = styled.div`
   display: flex;
   margin: 15px 56px 0;
   justify-content: flex-end;

   > button {
      margin-left: 15px;
   }
`;

const mapStateToProps = state => ({
   apiState: state.apiState,
});

const mapDispatchToProps = dispatch => {
   return {
      popPopup: () => dispatch(PopupActions.popPopup()),
      updateUser: user => dispatch(ApiActions.updateUser(user)),
   };
};

class UserSelector extends Component {
   state = {
      username: '',
      password: '',
   };

   handleClick = onClick => {
      this.props.popPopup();
      setTimeout(() => {
         typeof onClick === 'function' && onClick();
      }, 250);
   };

   updateUsername = e => {
      this.setState({ username: e.target.value });
   };

   updatePassword = e => {
      this.setState({ password: e.target.value });
   };

   logIn = () => {
      const { apiState } = this.props;
      let { user } = apiState;
      let { username } = this.state;

      user.username = username;

      this.props.updateUser(user);
      this.props.popPopup();
   };

   render() {
      const { index, closing } = this.props;
      const { username, password } = this.state;

      return (
         <Container index={index}>
            <Cover closing={closing} onClick={this.handleClick} />
            <Modal closing={closing}>
               <Header>
                  <Emoji>
                     <span role="img" aria-label="file">
                        👨‍💻
                     </span>
                  </Emoji>
                  <div>
                     <Title>Log In</Title>
                     <Subtitle>Please enter your credentials</Subtitle>
                  </div>
               </Header>
               <InputContainer>
                  <TextInput
                     value={username}
                     onChange={this.updateUsername}
                     autoFocus
                     placeholder="Username"
                  />
                  <TextInput
                     type="password"
                     value={password}
                     onChange={this.updatePassword}
                     placeholder="Password"
                  />
               </InputContainer>
               <ButtonContainer>
                  <Button
                     design="primary"
                     disabled={username.length === 0 || password.length < 4}
                     onClick={this.logIn}>
                     Log In
                  </Button>
               </ButtonContainer>
            </Modal>
         </Container>
      );
   }
}
export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(UserSelector);
