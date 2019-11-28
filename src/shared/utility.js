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
      .map((objectKey) => ({
          ...objectList[objectKey],
          id: objectKey
    }));
  };

  export const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> c / 4))).toString(16)
    );
  }