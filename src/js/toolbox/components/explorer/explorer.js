import React from "react";
import Icon, { ChevronRight } from "./icon";
import Item from "./item";
import Column from "./column";
import Spacer from "./spacer";
import Truncate from "./truncate";

function Explorer({ data, path, onChange, width, height }) {
  return (
    <div
      style={{
        display: "flex",
        width,
        height,
        overflowX: "auto"
      }}
    >
      <RecursiveExplorer data={data} leadingPath={path} onChange={onChange} />
    </div>
  );
}

Explorer.defaultProps = {
  width: "100%",
  height: "100%"
};

function RecursiveExplorer({ data, leadingPath, trailingPath, onChange }) {
  if (Array.isArray(data)) {
    return null;
  }

  return (
    <React.Fragment>
      <Column>
        {Object.keys(data).map(name => {
          const isSelected = name === leadingPath[0];
          return (
            <Item
              key={name}
              style={{
                color: isSelected ? "white" : "black",
                backgroundColor: isSelected ? "black" : "transparent"
              }}
              onClick={() => onChange(trailingPath.concat(name))}
            >
              <Truncate>{name}</Truncate>
              <Spacer />
              {Array.isArray(data[name]) ? null : (
                <Icon
                  icon={ChevronRight}
                  size={16}
                  color={isSelected ? "white" : "black"}
                />
              )}
            </Item>
          );
        })}
      </Column>
      {leadingPath.length > 0 ? (
        <RecursiveExplorer
          data={data[leadingPath[0]]}
          leadingPath={leadingPath.slice(1)}
          trailingPath={trailingPath.concat(leadingPath.slice(0, 1))}
          onChange={onChange}
        />
      ) : null}
    </React.Fragment>
  );
}

RecursiveExplorer.defaultProps = {
  trailingPath: []
};

export default Explorer;
