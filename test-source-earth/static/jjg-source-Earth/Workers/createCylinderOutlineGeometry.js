/* This file is automatically rebuilt by the Cesium build process. */
define(['./GeometryOffsetAttribute-e8e698d7', './Transforms-6820a6cd', './Matrix2-0e286ffc', './RuntimeError-4fdc4459', './ComponentDatatype-9ed50558', './CylinderGeometryLibrary-5924d4e5', './when-8166c7dd', './GeometryAttribute-62016d45', './GeometryAttributes-50becc99', './IndexDatatype-797210ca', './combine-a5c4cc47', './WebGLConstants-0664004c'], (function (GeometryOffsetAttribute, Transforms, Matrix2, RuntimeError, ComponentDatatype, CylinderGeometryLibrary, when, GeometryAttribute, GeometryAttributes, IndexDatatype, combine, WebGLConstants) { 'use strict';

  var radiusScratch = new Matrix2.Cartesian2();

  /**
   * A description of the outline of a cylinder.
   *
   * @alias CylinderOutlineGeometry
   * @constructor
   *
   * @param {Object} options Object with the following properties:
   * @param {Number} options.length The length of the cylinder.
   * @param {Number} options.topRadius The radius of the top of the cylinder.
   * @param {Number} options.bottomRadius The radius of the bottom of the cylinder.
   * @param {Number} [options.slices=128] The number of edges around the perimeter of the cylinder.
   * @param {Number} [options.numberOfVerticalLines=16] Number of lines to draw between the top and bottom surfaces of the cylinder.
   *
   * @exception {DeveloperError} options.length must be greater than 0.
   * @exception {DeveloperError} options.topRadius must be greater than 0.
   * @exception {DeveloperError} options.bottomRadius must be greater than 0.
   * @exception {DeveloperError} bottomRadius and topRadius cannot both equal 0.
   * @exception {DeveloperError} options.slices must be greater than or equal to 3.
   *
   * @see CylinderOutlineGeometry.createGeometry
   *
   * @example
   * // create cylinder geometry
   * var cylinder = new Cesium.CylinderOutlineGeometry({
   *     length: 200000,
   *     topRadius: 80000,
   *     bottomRadius: 200000,
   * });
   * var geometry = Cesium.CylinderOutlineGeometry.createGeometry(cylinder);
   */
  function CylinderOutlineGeometry(options) {
    options = when.defaultValue(options, when.defaultValue.EMPTY_OBJECT);

    var length = options.length;
    var topRadius = options.topRadius;
    var bottomRadius = options.bottomRadius;
    var slices = when.defaultValue(options.slices, 128);
    var numberOfVerticalLines = Math.max(
      when.defaultValue(options.numberOfVerticalLines, 16),
      0
    );

    //>>includeStart('debug', pragmas.debug);
    RuntimeError.Check.typeOf.number("options.positions", length);
    RuntimeError.Check.typeOf.number("options.topRadius", topRadius);
    RuntimeError.Check.typeOf.number("options.bottomRadius", bottomRadius);
    RuntimeError.Check.typeOf.number.greaterThanOrEquals("options.slices", slices, 3);
    if (
      when.defined(options.offsetAttribute) &&
      options.offsetAttribute === GeometryOffsetAttribute.GeometryOffsetAttribute.TOP
    ) {
      throw new RuntimeError.DeveloperError(
        "GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry."
      );
    }
    //>>includeEnd('debug');

    this._length = length;
    this._topRadius = topRadius;
    this._bottomRadius = bottomRadius;
    this._slices = slices;
    this._numberOfVerticalLines = numberOfVerticalLines;
    this._offsetAttribute = options.offsetAttribute;
    this._workerName = "createCylinderOutlineGeometry";
  }

  /**
   * The number of elements used to pack the object into an array.
   * @type {Number}
   */
  CylinderOutlineGeometry.packedLength = 6;

  /**
   * Stores the provided instance into the provided array.
   *
   * @param {CylinderOutlineGeometry} value The value to pack.
   * @param {Number[]} array The array to pack into.
   * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
   *
   * @returns {Number[]} The array that was packed into
   */
  CylinderOutlineGeometry.pack = function (value, array, startingIndex) {
    //>>includeStart('debug', pragmas.debug);
    RuntimeError.Check.typeOf.object("value", value);
    RuntimeError.Check.defined("array", array);
    //>>includeEnd('debug');

    startingIndex = when.defaultValue(startingIndex, 0);

    array[startingIndex++] = value._length;
    array[startingIndex++] = value._topRadius;
    array[startingIndex++] = value._bottomRadius;
    array[startingIndex++] = value._slices;
    array[startingIndex++] = value._numberOfVerticalLines;
    array[startingIndex] = when.defaultValue(value._offsetAttribute, -1);

    return array;
  };

  var scratchOptions = {
    length: undefined,
    topRadius: undefined,
    bottomRadius: undefined,
    slices: undefined,
    numberOfVerticalLines: undefined,
    offsetAttribute: undefined,
  };

  /**
   * Retrieves an instance from a packed array.
   *
   * @param {Number[]} array The packed array.
   * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {CylinderOutlineGeometry} [result] The object into which to store the result.
   * @returns {CylinderOutlineGeometry} The modified result parameter or a new CylinderOutlineGeometry instance if one was not provided.
   */
  CylinderOutlineGeometry.unpack = function (array, startingIndex, result) {
    //>>includeStart('debug', pragmas.debug);
    RuntimeError.Check.defined("array", array);
    //>>includeEnd('debug');

    startingIndex = when.defaultValue(startingIndex, 0);

    var length = array[startingIndex++];
    var topRadius = array[startingIndex++];
    var bottomRadius = array[startingIndex++];
    var slices = array[startingIndex++];
    var numberOfVerticalLines = array[startingIndex++];
    var offsetAttribute = array[startingIndex];

    if (!when.defined(result)) {
      scratchOptions.length = length;
      scratchOptions.topRadius = topRadius;
      scratchOptions.bottomRadius = bottomRadius;
      scratchOptions.slices = slices;
      scratchOptions.numberOfVerticalLines = numberOfVerticalLines;
      scratchOptions.offsetAttribute =
        offsetAttribute === -1 ? undefined : offsetAttribute;
      return new CylinderOutlineGeometry(scratchOptions);
    }

    result._length = length;
    result._topRadius = topRadius;
    result._bottomRadius = bottomRadius;
    result._slices = slices;
    result._numberOfVerticalLines = numberOfVerticalLines;
    result._offsetAttribute =
      offsetAttribute === -1 ? undefined : offsetAttribute;

    return result;
  };

  /**
   * Computes the geometric representation of an outline of a cylinder, including its vertices, indices, and a bounding sphere.
   *
   * @param {CylinderOutlineGeometry} cylinderGeometry A description of the cylinder outline.
   * @returns {Geometry|undefined} The computed vertices and indices.
   */
  CylinderOutlineGeometry.createGeometry = function (cylinderGeometry) {
    var length = cylinderGeometry._length;
    var topRadius = cylinderGeometry._topRadius;
    var bottomRadius = cylinderGeometry._bottomRadius;
    var slices = cylinderGeometry._slices;
    var numberOfVerticalLines = cylinderGeometry._numberOfVerticalLines;

    if (
      length <= 0 ||
      topRadius < 0 ||
      bottomRadius < 0 ||
      (topRadius === 0 && bottomRadius === 0)
    ) {
      return;
    }

    var numVertices = slices * 2;

    var positions = CylinderGeometryLibrary.CylinderGeometryLibrary.computePositions(
      length,
      topRadius,
      bottomRadius,
      slices,
      false
    );
    var numIndices = slices * 2;
    var numSide;
    if (numberOfVerticalLines > 0) {
      var numSideLines = Math.min(numberOfVerticalLines, slices);
      numSide = Math.round(slices / numSideLines);
      numIndices += numSideLines;
    }

    var indices = IndexDatatype.IndexDatatype.createTypedArray(numVertices, numIndices * 2);
    var index = 0;
    var i;
    for (i = 0; i < slices - 1; i++) {
      indices[index++] = i;
      indices[index++] = i + 1;
      indices[index++] = i + slices;
      indices[index++] = i + 1 + slices;
    }

    indices[index++] = slices - 1;
    indices[index++] = 0;
    indices[index++] = slices + slices - 1;
    indices[index++] = slices;

    if (numberOfVerticalLines > 0) {
      for (i = 0; i < slices; i += numSide) {
        indices[index++] = i;
        indices[index++] = i + slices;
      }
    }

    var attributes = new GeometryAttributes.GeometryAttributes();
    attributes.position = new GeometryAttribute.GeometryAttribute({
      componentDatatype: ComponentDatatype.ComponentDatatype.DOUBLE,
      componentsPerAttribute: 3,
      values: positions,
    });

    radiusScratch.x = length * 0.5;
    radiusScratch.y = Math.max(bottomRadius, topRadius);

    var boundingSphere = new Transforms.BoundingSphere(
      Matrix2.Cartesian3.ZERO,
      Matrix2.Cartesian2.magnitude(radiusScratch)
    );

    if (when.defined(cylinderGeometry._offsetAttribute)) {
      length = positions.length;
      var applyOffset = new Uint8Array(length / 3);
      var offsetValue =
        cylinderGeometry._offsetAttribute === GeometryOffsetAttribute.GeometryOffsetAttribute.NONE
          ? 0
          : 1;
      GeometryOffsetAttribute.arrayFill(applyOffset, offsetValue);
      attributes.applyOffset = new GeometryAttribute.GeometryAttribute({
        componentDatatype: ComponentDatatype.ComponentDatatype.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: applyOffset,
      });
    }

    return new GeometryAttribute.Geometry({
      attributes: attributes,
      indices: indices,
      primitiveType: GeometryAttribute.PrimitiveType.LINES,
      boundingSphere: boundingSphere,
      offsetAttribute: cylinderGeometry._offsetAttribute,
    });
  };

  function createCylinderOutlineGeometry(cylinderGeometry, offset) {
    if (when.defined(offset)) {
      cylinderGeometry = CylinderOutlineGeometry.unpack(cylinderGeometry, offset);
    }
    return CylinderOutlineGeometry.createGeometry(cylinderGeometry);
  }

  return createCylinderOutlineGeometry;

}));
