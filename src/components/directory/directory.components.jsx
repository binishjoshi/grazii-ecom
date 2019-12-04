import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySelections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.components';

import { DirectoryMenuContainer } from './directory.styles';

const Directory = ({ sections }) => {        
  return (
    <DirectoryMenuContainer>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </DirectoryMenuContainer>
  )
}
const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySelections
})

export default connect(mapStateToProps)(Directory);