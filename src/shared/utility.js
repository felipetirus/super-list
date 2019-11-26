export const updateObject = (oldObject, updatedProperties) => {
    return {
          ...oldObject,
          ...updatedProperties
    }
}

export const updateByIndex = (indexChange, list, updatedProperties) => {
    let copyObject = [...list];
    return copyObject.map((el, index)=> (
         index === indexChange ?
            updateObject(list[indexChange], updatedProperties):
            el)
    );
}

export const objectToList = (objectList) => {
    return Object.keys(objectList)
      .map((objectKey) => objectList[objectKey]);
  };