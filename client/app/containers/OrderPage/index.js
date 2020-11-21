/**
 *
 * OrderPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

import OrderDetails from '../../components/OrderDetails';
import NotFound from '../../components/NotFound';
import LoadingIndicator from '../../components/LoadingIndicator';

class OrderPage extends React.PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchOrder(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const id = this.props.match.params.id;
      this.props.fetchOrder(id);
    }
  }

  render() {
    const { order,role, isLoading, cancelOrder, cancelOrderItem ,completeOrderItem} = this.props;
    return (
      <div className='order-page'>
        {isLoading ? (
          <LoadingIndicator backdrop />
        ) : order._id ? (
          <OrderDetails
          role={role}
            order={order}
            cancelOrder={cancelOrder}
            cancelOrderItem={cancelOrderItem}
            completeOrderItem={completeOrderItem}
          />
        ) : (
          <NotFound message='no order found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    role:state.account.user.role,

    order: state.order.order,
    isLoading: state.order.isLoading
  };
};

export default connect(mapStateToProps, actions)(OrderPage);
