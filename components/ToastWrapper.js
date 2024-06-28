import React from 'react';
import Toast from 'react-native-toast-message';

const ToastWrapper = React.forwardRef((props, ref) => (
  <Toast ref={ref} {...props} />
));

export default ToastWrapper;
