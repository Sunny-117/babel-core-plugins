module.exports = function ({ types: t }) {
  return {
    // babel插件的执行是通过vistitor设计模式执行的
    visitor: {
      Identifier(path) { // 遇到标识符就会触发：Identifier
        console.log('=======', path.node.name, '=======')
        const parentNodeIsIfStatement = t.isIfStatement(path.parent);
        const isDebug = path.node.name === "DEBUG";
        /**
         * 名字是DEBUG  父级是isIfStatement 则满足
         */
        if (isDebug && parentNodeIsIfStatement) {
          const stringNode = t.stringLiteral("DEBUG");
          path.replaceWith(stringNode);
        }
      },

      StringLiteral(path) {
        const parentNodeIsIfStatement = t.isIfStatement(path.parent);
        const isDebug = path.node.value === "DEBUG";

        if (isDebug && parentNodeIsIfStatement) {
          if (process.env.NODE_ENV === "production") {
            path.parentPath.remove();
          }
        }
      },
    },
  };
};
