import "zip";

// matrix 纵横转制
d3.transpose = function (matrix) {
    return d3.zip.apply(d3, matrix);
};
