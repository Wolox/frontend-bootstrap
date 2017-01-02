### Model objects example

__Must read:__ https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc#.3dosxlvf0

```js
angular.module('app-bootstrap').factory('AbstractModel', [
  function () {

    const privateBuild = function (modelData) {
      return new this(modelData);
    };

    class AbstractModel {

      constructor (modelData) {
        _.extend(this, modelData);
      }

      /**
       * List of attributes that should be serialized with custom methods
       * @return [string]
       */
      get serializableAttributes () {
        return [];
      }

      /**
       * List of attributes that should not be sent to the backend
       * @return [string]
       */
      get nonSerializableAttributes () {
        return [];
      }

      equals (other) {
        if (!other) {
          return false;
        }
        return _.isEqual(this, other);
      }

      /**
       * Returns the json object of the model that the backend is expecting
       */
      serialize () {
        let serializedModel = angular.copy(this);

        // serialize attributes with custom serializers
        this.serializableAttributes.forEach((attr) => {
          const attrValue = this[attr];
          if (attrValue) {
            serializedModel[attr] = _.isArray(attrValue) ?
              attrValue.map((each) => each.serialize()) : attrValue.serialize();
          } else {
            serializedModel = _.omit(serializedModel, attr);
          }
        });

        // remove attributes that should not be serialized
        return _.omit(serializedModel, this.nonSerializableAttributes);
      }

      static build (modelData) {
        return _.isArray(modelData) ?
          modelData.map(privateBuild.bind(this)) : privateBuild.bind(this)(modelData);
      }

    }

    return AbstractModel;
  }
]);
```

```js
angular.module('app-bootstrap').factory('Bill', [
  'AbstractModel', 'User',
  function (AbstractModel, User) {

    class Bill extends AbstractModel {

      // Example: {
      //   owner: {
      //     firstName: string;
      //     lastName: string;
      //     id: int;
      //   },
      //   dates: {
      //     emitionDate: date Object;
      //     expirationDate: date Object;
      //   }
      // }

      constructor (exampleObject) {
        super(exampleObject);
        this.owner = new User(this.owner);
      }

      get nonSerializableAttributes () {
        return [...super.nonSerializableAttributes, 'fullOwnerName', 'dates'];
      }

      get serializableAttributes () {
        return [...super.serializableAttributes, 'owner'];
      }

      serialize () {
        const serializedExample = super.serialize();

        serializedExample.dates = {
          emitionDate: this.dates.emitionDate.toISOString(),
          expirationDate: this.dates.expirationDate.toISOString()
        };

        return serializedExample;
      }
    }

    return Bill;
  }
]);
```

```js
angular.module('app-bootstrap').factory('User', [
  'AbstractModel',
  function (AbstractModel) {

    class User extends AbstractModel {

      // Example: {
      //   firstName: string;
      //   lastName: string;
      //   id: int;
      // }

      this.getFullName = () => {
        return `${this.firstName} ${this.lastName}`;
      }

      serialize () {
        return this.id;
      }
    }

    return User;
  }
]);
```
