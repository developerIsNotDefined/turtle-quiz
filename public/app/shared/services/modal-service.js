const service = class {
  constructor($rootScope, $q){
    this.$rootScope = $rootScope;
    this.$q = $q;
    this.modal = {
      deferred: null,
      config: null
    };
  }

  open(config){
    this.modal.deferred = this.$q.defer();
    this.modal.config = config;

    this.$rootScope.$emit("modal.open");

    return(this.modal.deferred.promise);
  }

  modalConfig(){
    return(this.modal.config || {});
  }

  reject(reason){
    this.modal.deferred.reject(reason);
    this.modal.deferred = this.modal.config = null;

    this.$rootScope.$emit("modal.close");
  }

  resolve(response){
    this.modal.deferred.resolve(response);
    this.modal.deferred = this.modal.config = null;

    this.$rootScope.$emit("modal.close");
  }
};

service.$inject = ['$rootScope', '$q'];

export default service