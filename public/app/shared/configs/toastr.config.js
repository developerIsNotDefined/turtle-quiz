const config = toastrConfig => {
  angular.extend(toastrConfig, {
    closeButton: true,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    messageClass: 'toast-message',
    progressBar: true,
    tapToDismiss: true,
    timeOut: 5000,
    titleClass: 'toast-title',
    toastClass: 'toast',
    positionClass: 'toast-top-right',
    autoDismiss: true,
    maxOpened: 1,
    newestOnTop: true,
    target: 'body'
  });
};

config.$inject = ['toastrConfig'];

export default config