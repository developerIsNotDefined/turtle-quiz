const controller = class{
  constructor($state, factsService, toastr){
    this.$state = $state;
    this.factsService = factsService;
    this.toastr = toastr;

    this.loading = {turtlesFacts: 'true'};
    this.search = "";
    this.socialLinks = [
      'icon-facebook2',
      'icon-twitter',
      'icon-youtube',
      'icon-instagram'
    ];
  }

  $onInit() {
    this.loading.turtlesFacts = 'true';
    this.factsService.getTurtlesData()
      .then(response => {
        if(!response.cashed){
          this.toastr.success('Turtles information has been successfully loaded!');
        }
        this.turtlesFacts = response.data;
      })
      .catch(error => this.toastr.error('Turtles information hasn\'t been loaded!', {timeOut: 0}))
      .finally(() => this.loading.turtlesFacts = 'false');
  }

  turtleInfo(activeTurtle) {
    this.$state.go('facts.turtleInfo', {
      id: activeTurtle.id+1,
      activeTurtle: activeTurtle
    });
  }
};

controller.$inject = ['$state', 'factsService', 'toastr'];

const component = {
  templateUrl: 'app/stateful-components/facts/facts.html',
  controller
};

export default component