const controller = class {
  constructor($state, authService, toastr, dataService, modalService){
    this.$state = $state;
    this.authService = authService;
    this.toastr = toastr;
    this.dataService = dataService;
    this.modalService = modalService;
  }

  $onInit() {
    this.isAuthenticated = this.dataService.isAuthenticated();
    this.open(this.isAuthenticated);
  }

  signUp(authData) {
    if (this.isAuthenticated){
      const user = JSON.parse(localStorage.getItem('user'));
      return this.toastr.warning(`Looks like you, ${user.name.toUpperCase()}, are signed in already!`);
    }

    this.authService.signUp(authData)
      .then(name => this.toastr.success(`Welcome ${name.toUpperCase()}! you can start quiz!`))
      .catch(error => this.toastr.error(error, {timeOut: 0}));
  }

  signIn(authData) {
    this.authService.signIn(authData)
      .then(name => this.toastr.success(`Welcome back ${name.toUpperCase()}! Long time no see, you can start quiz!`))
      .catch(error => this.toastr.error(error.data.message + ', please enter true information!', {timeOut: 0}));
  }

  signOut() {
    this.authService.signOut()
      .then(name => this.toastr.warning(`Goodbye ${name.toUpperCase()}... hope we meet again soon!`))
      .catch(error => this.toastr.error(error.data.message + ', please try again later!', {timeOut: 0}));
  }

  delegate(authData) {
    switch (authData.method) {
      case 'signUp':
        this.signUp(authData.user);
        break;
      case 'signIn':
        this.signIn(authData.user);
        break;
      case 'signOut':
        this.signOut();
        break;
    }
    this.$state.go('facts');
  }

  open(isAuthenticated) {
    this.modalService.open({
      templateUrl: 'app/stateful-components/facts/authorization/authorization.html',
      data:{
        isAuthenticated
      }
    })
      .then(authData => this.delegate(authData))
      .catch(() => this.$state.go('facts'));
  }
};

controller.$inject = ['$state', 'authService', 'toastr', 'dataService', 'modalService'];

const component = {
  controller
};

export default component