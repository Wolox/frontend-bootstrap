angular.module('app-bootstrap').factory('ExampleModel', [
  'AbstractModel',
  function (AbstractModel) {

    class ExampleModel extends AbstractModel {

      // Example: {
      //   owner: {
      //     firstName: string;
      //     lastName: string;
      //   },
      //   dates: {
      //     emitionDate: date Object;
      //     expirationDate: date Object;
      //   }
      // }
      constructor (exampleObject) {

        super(exampleObject);
        this.ownerName = `${this.owner.firstName} ${this.owner.lastName}`;
        this.emitionDate = this.dates.emition.toLocaleDateString();
        this.expirationDate = this.dates.expiration.toLocaleDateString();
      }

      get nonSerializableAttributes () {
        return [...super.nonSerializableAttributes, 'ownerName'];
      }

      serialize () {
        const serializedExample = super.serialize();
        serializedExample.dates = { emition: this.emitionDate, expiration: this.expirationDate };
        delete serializedExample.emitionDate;
        delete serializedExample.expirationDate;
        return serializedExample;
      }
    }

    return ExampleModel;
  }
]);
