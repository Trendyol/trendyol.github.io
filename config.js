System.config({
    transpiler: 'traceur',
    traceurOptions: {
      annotations: true,
      types: true,
      memberVariables: true
    },
    map: {
      traceur: 'js/libs/traceur'
    }
});
