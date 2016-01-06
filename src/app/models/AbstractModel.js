angular.module('app-bootstrap').factory('AbstractModel', [
  'Restangular',
  function (Restangular) {

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
        return _.isEqual(Restangular.stripRestangular(this), Restangular.stripRestangular(other));
      }

      /**
       * Returns the json object of the model that the backend is expecting
       */
      serialize () {
        let serializedModel = angular.copy(this);

        // remove restangular boilerplate
        if (serializedModel.restangularized) {
          serializedModel = Restangular.stripRestangular(serializedModel);
        }

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

      static apiResponseTransformer (modelData) {
        return _.isArray(modelData) ?
          modelData.map(privateBuild.bind(this)) : privateBuild.bind(this)(modelData);
      }

    }

    return AbstractModel;
  }
]);
