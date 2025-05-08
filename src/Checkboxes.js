const Checkboxes = ({ data, rootData, isChecked, setIsChecked }) => {
  const handleChnage = (node, isCheck) => {
    setIsChecked((prev) => {
      const newState = { ...prev, [node.id]: isCheck };
      
      //if the parent checkbox is checked, then it should check all its children, if it is unchecked should uncheck all its children
      const updateChildren = (node) => {
        node.children?.forEach(child => {
            newState[child.id] = isCheck;
            child.children && updateChildren(child);
        });
      };
      

      //if all the children is checked then it should check the parent and vice-versa
      const updateParent = (node, data) => {
        const findParent = (nodeId, data) => {
          for(let item of data){
            if(item.children && item.children?.some((child) => child.id === nodeId)){
              return item;
            }
            const found = item.children && findParent(nodeId, item.children);
            if(found) return found;
          }
          return null;
        };


        let parent = findParent(node.id, data);
        while(parent){
          const allowParentCheck = parent.children?.every((child) => newState[child.id]);
          newState[parent.id] = allowParentCheck;
          parent = findParent(parent.id, data);
        }
      };

      updateChildren(node);
      updateParent(node, rootData);

      return newState;
    });
  };

  return (
    <div>
      {data?.map(
        (
          node,
          i // make sure to return the jsx from map(here i have used  => () instead of curly braces to resturn directly.) If using {} then write jsx with return(..)
        ) => (
          <div key={i} className="parent">
            <input
              type="checkbox"
              checked={isChecked[node.id] || false}
              onChange={(e) => handleChnage(node, e.target.checked)}
            />
            <label>{node.name}</label>
            {node.children && (
              <Checkboxes
                data={node.children}
                rootData={rootData} // // pass original root for verifyIsChecked, because we need to verify the entire original root tree from the top level, not only the current subtree.
                isChecked={isChecked}
                setIsChecked={setIsChecked}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Checkboxes;
