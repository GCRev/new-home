import { connect } from 'react-redux';
import { Button } from '../../Components';
import {
  addResource,
  enableResource,
  disableResource
} from '../inventory/inventorySlice';
import {
  checkCraftingRequirements
} from '../crafting/craftingSlice';

const mapStateToProps = (
  state,
  ownProps
) => {
  return {
    name: `Gather ${ownProps.resource.desc}: ${ownProps.resource.amount}`,
    enabled: ownProps.resource.enabled,
    timeout: ownProps.resource.timeout
  };
};
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch(disableResource({ resourceId: ownProps.resource.key }));
      setTimeout(() => {
        dispatch(addResource({ resourceId: ownProps.resource.key }));
        dispatch(enableResource({ resourceId: ownProps.resource.key }));
        dispatch(checkCraftingRequirements({ inventory: ownProps.inventory }));
      }, ownProps.resource.timeout * 1000)
    }
  };
}
const ResourceButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);

export {
  ResourceButton
}
