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
      updateChildren(node);

      //if all the children is checked then it should check the parent and vice-versa
      const verifyIsChecked = (node) => {
        //Base Case
        if(!node.children) return newState[node.id] || false;

        const allowParentCheck = node.children.every((child) => verifyIsChecked(child));
        newState[node.id] = allowParentCheck;
        return allowParentCheck;
      };

      rootData.forEach((node) => verifyIsChecked(node));

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
