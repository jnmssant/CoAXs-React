/**
 * Created by xinzheng on 4/4/17.
 */

import React from "react";
import { Modal, Tooltip, Overlay, Popover, OverlayTrigger } from 'react-bootstrap';
import s from "./Navbar.css"
import classNames from "classnames"
import IntroModal from "../Modal/IntroModal"
import ScenarioCreationModal from "../Modal/ScenarioCreationModal"
import ExitSurveyModal from "../Modal/ExitSurveyModal"
import PreSurveyModal from "../Modal/PreSurveyModal"


//import redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

/**
 * The main view which include TopleftPanel, map and Bottom component
 */

class Navbar extends React.Component {
  constructor(){
    super();
    this.state = {
      showIntro: false,
      showScenario: false,
      showSurvey: false,
      showPreSurvey: true,
      show: false,
    };
    this.closeScenario = this.closeScenario.bind(this);
    this.closeIntro = this.closeIntro.bind(this);
    this.closeExitSurvey = this.closeExitSurvey.bind(this);
    this.closePreSurvey = this.closePreSurvey.bind(this);

    this.handleClickScenario = this.handleClickScenario.bind(this);
    this.handleClickIntro = this.handleClickIntro.bind(this);
    this.handleClickSurvey = this.handleClickSurvey.bind(this);
    this.handleClickPreSurvey = this.handleClickPreSurvey.bind(this);

    this.handleClick = this.handleClick.bind(this);



  }

  handleClick(e) {

    this.setState({ target: e.target, show: !this.state.show });
  };

  closeScenario(){
    this.setState({ showScenario: false });
  }

  closeIntro(){
    this.setState({ showIntro: false });
  }

  closeExitSurvey(){
    this.setState({ showSurvey: false });
  }

  closePreSurvey(){
    this.props.donePreSurvey(" ");
    this.setState({ showPreSurvey: false, showIntro: true });

  }


  handleClickScenario(){
    this.setState({ showScenario: true });
  }

  handleClickIntro(){
    this.setState({ showIntro: true });
  }

  handleClickSurvey(){
    this.props.doneExitSurvey(" ");
    this.setState({ showSurvey: true });
  }

  handleClickPreSurvey(){
    this.setState({ showPreSurvey: true });

  }


  componentWillReceiveProps(nextProps){
    if (nextProps.isdoneOneScenario !== this.props.isdoneOneScenario){
      this.setState({ showScenario: true });
    }
  }


  render() {
    const preClass = classNames({
      "navitem": true,
      "active": !this.props.isdonePreSurvey,
      "blink":!this.props.isdonePreSurvey,
    });

    const introClass = classNames({
      "navitem": true,
      "active": !this.props.isdoneOneScenario,
      "blink": this.props.isdonePreSurvey & !this.props.isdoneOneScenario,
    });

    const compareClass = classNames({
      "navitem": true,
      "active": !this.props.isdoneCompareScenario,
      "blink": this.props.isdoneOneScenario & !this.props.isdoneCompareScenario,
    });

    const exitClass = classNames({
      "navitem": true,
      "active": !this.props.isdoneExitSurvey,
      "blink": this.props.isdoneCompareScenario & !this.props.isdoneExitSurvey,
    });

    const popoverFocus = (
      <Popover id="popover-trigger-focus" title="Popover bottom">
        <strong>Holy guacamole!</strong> Check this info.
      </Popover>
    );

    return (
      <div>
        <ul className="navbarTop">
          <li className="navitem" ref="target">
              <a href="https://coaxs-landing-nola.herokuapp.com/" target="_blank" >Landing Page</a>
          </li>
          <li className={preClass}>
             <a className="" href="#" onClick={this.handleClickPreSurvey} >Pre-survey</a>
          </li>
          <li className={introClass}>
            <a  className="" href="#" onClick={this.handleClickIntro} >Intro to CoAXs</a>
          </li>


          <li className={compareClass}>
            <a className="" href="#" onClick={this.handleClickScenario}>Scenario Creation</a>
          </li>

          <li className={exitClass} ref="exit">
            <a className="" href="#" onClick={this.handleClickSurvey}>Post-survey</a>
          </li>

        </ul>

        <Overlay
          show={true}
          target={this.refs.exit}
          placement="bottom"
          container={this}
          containerPadding={20}
        >
          <Popover id="popover-contained" title="Popover bottom">
            <strong>Holy guacamole!</strong> Check this info.
          </Popover>
        </Overlay>


        <IntroModal isShow={this.state.showIntro} closeModal={this.closeIntro}/>
        <ScenarioCreationModal isShow={this.state.showScenario} closeModal={this.closeScenario}/>
        <ExitSurveyModal isShow={this.state.showSurvey} closeModal={this.closeExitSurvey}/>
        <PreSurveyModal isShow={this.state.showPreSurvey} closeModal={this.closePreSurvey}/>

      </div>

    );
  }
}


//bind store and function to props
function mapStateToProps(state) {

  return {
    isdoneOneScenario: state.navState.isdoneOneScenario,
    isdoneCompareScenario: state.navState.isdoneCompareScenario,
    isdoneExitSurvey: state.navState.isdoneExitSurvey,
    isdonePreSurvey: state.navState.isdonePreSurvey,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispachToProps)(Navbar);




