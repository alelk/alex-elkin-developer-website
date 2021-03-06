/**
 * Menu
 *
 * Created by Alex Elkin on 22.11.2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Dropdown, Menu, Visibility, Flag
} from 'semantic-ui-react';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  backgroundColor: 'transparent',
  transition: 'box-shadow 1s ease, padding 1s ease, background-color 1s ease'
};

const fixedMenuStyle = {
  border: '1px solid #000',
  backgroundColor: "rgba(0, 0, 0, .9)",
  boxShadow: '0px 2px 5px rgba(0, 0, 0, .5)'
};

const renderLanguagesMenu = (currentLangId, languages, onSelect) => {
  const currentLanguage = languages.find(l => l.id === currentLangId);
  return (
    <Menu.Menu position='right'>
      <Dropdown icon={currentLanguage && <Flag name={currentLanguage.flagName}/>}
                className='link item'
                button
                pointing>
        <Dropdown.Menu>
          {
            languages.map(language =>
              <Dropdown.Item key={language.id} onClick={() => onSelect && onSelect(language)}>
                <Flag name={language.flagName}/>
                {language.title}
              </Dropdown.Item>
            )
          }
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  )
};

class StickyMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFixed: false
    };
    this.onStickMenu = this.onStickMenu.bind(this);
    this.onUnstickMenu = this.onUnstickMenu.bind(this);
  }

  onStickMenu() {
    this.setState({isFixed: true});
    console.log("Bottom passed")
  }

  onUnstickMenu() {
    this.setState({isFixed: false});
    console.log("Bottom visible")
  }

  render() {
    const {context, currentLangId, languages, onLanguageSelected, menuItems} = this.props;
    return (
      <Visibility
        context={context}
        onBottomPassed={this.onStickMenu}
        onBottomVisible={this.onUnstickMenu}
        once={false}
        updateOn='repaint'
      >
        <Menu
          borderless
          fixed={this.state.isFixed ? 'top' : undefined}
          style={this.state.isFixed ? fixedMenuStyle : menuStyle}
          inverted
        >
          <Container text>
            {menuItems && menuItems.map((item, key) => <Menu.Item key={key}>{item}</Menu.Item>)}
            {languages && renderLanguagesMenu(currentLangId, languages, onLanguageSelected)}
          </Container>
        </Menu>
      </Visibility>
    )
  }
}

StickyMenu.propTypes = {
  context: PropTypes.object,
  currentLangId: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    flagName: PropTypes.string,
    id: PropTypes.string
  })),
  onLanguageSelected: PropTypes.func,
  menuItems: PropTypes.arrayOf(PropTypes.element)
};

export default StickyMenu;