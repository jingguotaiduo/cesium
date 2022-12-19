/* This file is automatically rebuilt by the Cesium build process. */
define(['./arrayRemoveDuplicates-198208a4', './Transforms-6820a6cd', './Matrix2-0e286ffc', './RuntimeError-4fdc4459', './ComponentDatatype-9ed50558', './CoplanarPolygonGeometryLibrary-34d6cf9b', './when-8166c7dd', './GeometryAttribute-62016d45', './GeometryAttributes-50becc99', './GeometryInstance-520da454', './GeometryPipeline-578df391', './IndexDatatype-797210ca', './PolygonGeometryLibrary-9ed170bc', './combine-a5c4cc47', './WebGLConstants-0664004c', './OrientedBoundingBox-b62ad47d', './EllipsoidTangentPlane-92987b6e', './AxisAlignedBoundingBox-2f5a74f3', './IntersectionTests-c62fb102', './Plane-456cf3fd', './AttributeCompression-a3d02c34', './EncodedCartesian3-3d8cb924', './ArcType-13a53523', './EllipsoidRhumbLine-403e6a39', './PolygonPipeline-cdbe9094'], (function (arrayRemoveDuplicates, Transforms, Matrix2, RuntimeError, ComponentDatatype, CoplanarPolygonGeometryLibrary, when, GeometryAttribute, GeometryAttributes, GeometryInstance, GeometryPipeline, IndexDatatype, PolygonGeometryLibrary, combine, WebGLConstants, OrientedBoundingBox, EllipsoidTangentPlane, AxisAlignedBoundingBox, IntersectionTests, Plane, AttributeCompression, EncodedCartesian3, ArcType, EllipsoidRhumbLine, PolygonPipeline) { 'use strict';

  function createGeometryFromPositions(positions) {
    var length = positions.length;
    var flatPositions = new Float64Array(length * 3);
    var indices = IndexDatatype.IndexDatatype.createTypedArray(length, length * 2);

    var positionIndex = 0;
    var index = 0;

    for (var i = 0; i < length; i++) {
      var position = positions[i];
      flatPositions[positionIndex++] = position.x;
      flatPositions[positionIndex++] = position.y;
      flatPositions[positionIndex++] = position.z;

      indices[index++] = i;
      indices[index++] = (i + 1) % length;
    }

    var attributes = new GeometryAttributes.GeometryAttributes({
      position: new GeometryAttribute.GeometryAttribute({
        componentDatatype: ComponentDatatype.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: flatPositions,
      }),
    });

    return new GeometryAttribute.Geometry({
      attributes: attributes,
      indices: indices,
      primitiveType: GeometryAttribute.PrimitiveType.LINES,
    });
  }

  /**
   * A description of the outline of a polygon composed of arbitrary coplanar positions.
   *
   * @alias CoplanarPolygonOutlineGeometry
   * @constructor
   *
   * @param {Object} options Object with the following properties:
   * @param {PolygonHierarchy} options.polygonHierarchy A polygon hierarchy that can include holes.
   *
   * @see CoplanarPolygonOutlineGeometry.createGeometry
   *
   * @example
   * var polygonOutline = new Cesium.CoplanarPolygonOutlineGeometry({
   *   positions : Cesium.Cartesian3.fromDegreesArrayHeights([
   *      -90.0, 30.0, 0.0,
   *      -90.0, 30.0, 1000.0,
   *      -80.0, 30.0, 1000.0,
   *      -80.0, 30.0, 0.0
   *   ])
   * });
   * var geometry = Cesium.CoplanarPolygonOutlineGeometry.createGeometry(polygonOutline);
   */
  function CoplanarPolygonOutlineGeometry(options) {
    options = when.defaultValue(options, when.defaultValue.EMPTY_OBJECT);
    var polygonHierarchy = options.polygonHierarchy;
    //>>includeStart('debug', pragmas.debug);
    RuntimeError.Check.defined("options.polygonHierarchy", polygonHierarchy);
    //>>includeEnd('debug');

    this._polygonHierarchy = polygonHierarchy;
    this._workerName = "createCoplanarPolygonOutlineGeometry";

    /**
     * The number of elements used to pack the object into an array.
     * @type {Number}
     */
    this.packedLength =
      PolygonGeometryLibrary.PolygonGeometryLibrary.computeHierarchyPackedLength(polygonHierarchy) + 1;
  }

  /**
   * A description of a coplanar polygon outline from an array of positions.
   *
   * @param {Object} options Object with the following properties:
   * @param {Cartesian3[]} options.positions An array of positions that defined the corner points of the polygon.
   * @returns {CoplanarPolygonOutlineGeometry}
   */
  CoplanarPolygonOutlineGeometry.fromPositions = function (options) {
    options = when.defaultValue(options, when.defaultValue.EMPTY_OBJECT);

    //>>includeStart('debug', pragmas.debug);
    RuntimeError.Check.defined("options.positions", options.positions);
    //>>includeEnd('debug');

    var newOptions = {
      polygonHierarchy: {
        positions: options.positions,
      },
    };
    return new CoplanarPolygonOutlineGeometry(newOptions);
  };

  /**
   * Stores the provided instance into the provided array.
   *
   * @param {CoplanarPolygonOutlineGeometry} value The value to pack.
   * @param {Number[]} array The array to pack into.
   * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
   *
   * @returns {Number[]} The array that was packed into
   */
  CoplanarPolygonOutlineGeometry.pack = function (value, array, startingIndex) {
    //>>includeStart('debug', pragmas.debug);
    RuntimeError.Check.typeOf.object("value", value);
    RuntimeError.Check.defined("array", array);
    //>>includeEnd('debug');

    startingIndex = when.defaultValue(startingIndex, 0);

    startingIndex = PolygonGeometryLibrary.PolygonGeometryLibrary.packPolygonHierarchy(
      value._polygonHierarchy,
      array,
      startingIndex
    );

    array[startingIndex] = value.packedLength;

    return array;
  };

  var scratchOptions = {
    polygonHierarchy: {},
  };
  /**
   * Retrieves an instance from a packed array.
   *
   * @param {Number[]} array The packed array.
   * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {CoplanarPolygonOutlineGeometry} [result] The object into which to store the result.
   * @returns {CoplanarPolygonOutlineGeometry} The modified result parameter or a new CoplanarPolygonOutlineGeometry instance if one was not provided.
   */
  CoplanarPolygonOutlineGeometry.unpack = function (
    array,
    startingIndex,
    result
  ) {
    //>>includeStart('debug', pragmas.debug);
    RuntimeError.Check.defined("array", array);
    //>>includeEnd('debug');

    startingIndex = when.defaultValue(startingIndex, 0);

    var polygonHierarchy = PolygonGeometryLibrary.PolygonGeometryLibrary.unpackPolygonHierarchy(
      array,
      startingIndex
    );
    startingIndex = polygonHierarchy.startingIndex;
    delete polygonHierarchy.startingIndex;
    var packedLength = array[startingIndex];

    if (!when.defined(result)) {
      result = new CoplanarPolygonOutlineGeometry(scratchOptions);
    }

    result._polygonHierarchy = polygonHierarchy;
    result.packedLength = packedLength;

    return result;
  };

  /**
   * Computes the geometric representation of an arbitrary coplanar polygon, including its vertices, indices, and a bounding sphere.
   *
   * @param {CoplanarPolygonOutlineGeometry} polygonGeometry A description of the polygon.
   * @returns {Geometry|undefined} The computed vertices and indices.
   */
  CoplanarPolygonOutlineGeometry.createGeometry = function (polygonGeometry) {
    var polygonHierarchy = polygonGeometry._polygonHierarchy;

    var outerPositions = polygonHierarchy.positions;
    outerPositions = arrayRemoveDuplicates.arrayRemoveDuplicates(
      outerPositions,
      Matrix2.Cartesian3.equalsEpsilon,
      true
    );
    if (outerPositions.length < 3) {
      return;
    }
    var isValid = CoplanarPolygonGeometryLibrary.CoplanarPolygonGeometryLibrary.validOutline(outerPositions);
    if (!isValid) {
      return undefined;
    }

    var polygons = PolygonGeometryLibrary.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(
      polygonHierarchy,
      false
    );

    if (polygons.length === 0) {
      return undefined;
    }

    var geometries = [];

    for (var i = 0; i < polygons.length; i++) {
      var geometryInstance = new GeometryInstance.GeometryInstance({
        geometry: createGeometryFromPositions(polygons[i]),
      });
      geometries.push(geometryInstance);
    }

    var geometry = GeometryPipeline.GeometryPipeline.combineInstances(geometries)[0];
    var boundingSphere = Transforms.BoundingSphere.fromPoints(polygonHierarchy.positions);

    return new GeometryAttribute.Geometry({
      attributes: geometry.attributes,
      indices: geometry.indices,
      primitiveType: geometry.primitiveType,
      boundingSphere: boundingSphere,
    });
  };

  function createCoplanarPolygonOutlineGeometry(polygonGeometry, offset) {
    if (when.defined(offset)) {
      polygonGeometry = CoplanarPolygonOutlineGeometry.unpack(
        polygonGeometry,
        offset
      );
    }
    polygonGeometry._ellipsoid = Matrix2.Ellipsoid.clone(polygonGeometry._ellipsoid);
    return CoplanarPolygonOutlineGeometry.createGeometry(polygonGeometry);
  }

  return createCoplanarPolygonOutlineGeometry;

}));
