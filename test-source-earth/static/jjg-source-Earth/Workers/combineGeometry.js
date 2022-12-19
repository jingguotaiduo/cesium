/* This file is automatically rebuilt by the Cesium build process. */
define(['./PrimitivePipeline-b2a9070c', './createTaskProcessorWorker', './Transforms-6820a6cd', './Matrix2-0e286ffc', './RuntimeError-4fdc4459', './when-8166c7dd', './ComponentDatatype-9ed50558', './WebGLConstants-0664004c', './combine-a5c4cc47', './GeometryAttribute-62016d45', './GeometryAttributes-50becc99', './GeometryPipeline-578df391', './AttributeCompression-a3d02c34', './EncodedCartesian3-3d8cb924', './IndexDatatype-797210ca', './IntersectionTests-c62fb102', './Plane-456cf3fd', './WebMercatorProjection-37aaa17f'], (function (PrimitivePipeline, createTaskProcessorWorker, Transforms, Matrix2, RuntimeError, when, ComponentDatatype, WebGLConstants, combine, GeometryAttribute, GeometryAttributes, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, WebMercatorProjection) { 'use strict';

  function combineGeometry(packedParameters, transferableObjects) {
    var parameters = PrimitivePipeline.PrimitivePipeline.unpackCombineGeometryParameters(
      packedParameters
    );
    var results = PrimitivePipeline.PrimitivePipeline.combineGeometry(parameters);
    return PrimitivePipeline.PrimitivePipeline.packCombineGeometryResults(
      results,
      transferableObjects
    );
  }
  var combineGeometry$1 = createTaskProcessorWorker(combineGeometry);

  return combineGeometry$1;

}));
