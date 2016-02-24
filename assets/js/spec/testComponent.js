

define(function () {
    return function (template) {
        return {
            template: template,
            methods: {
                testSpy: jasmine.createSpy(),
                broadcastEvent: function (event, data) {
                    this.$broadcast(event, data);
                },
                emitEvent: function (event, data) {
                    this.$emit(event, data);
                },
                registerEvent: function (event) {
                    this.$on(event, this.testSpy);
                }
            }
        };
    };
});

