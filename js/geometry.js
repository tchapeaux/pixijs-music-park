function intersectRectangles(rect1, rect2) {
    // Returns true if rect1 and rect2 intersects
    var testLeft = rect1.x <= (rect2.x + rect2.w);
    var testRight = (rect1.x + rect1.w) >= rect2.x;
    var testBelow = rect1.y <= (rect2.y + rect2.h);
    var testAbove = (rect1.y + rect1.h) >= rect2.y;

    if (testLeft && testRight && testBelow && testAbove) {
        return true;
    } else {
        return false;
    }

}

// Return true if rect1 fully contains rect2
function containsRectangle(rect1, rect2) {
    // check containment x-wise
    if (rect1.x < rect2.x && rect1.x + rect1.w > rect2.x + rect2.w) {
        // check containment y-wise
        if (rect1.y < rect2.y && rect1.y + rect1.h > rect2.y + rect2.h) {
            return true;
        }
    }
    return false;
}
