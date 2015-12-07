///////////////////////////////////////////////////////////////////////////////
// Rendering large lists can be super slow. This is an old UI problem.

///////////////////////////////////////////////////////////////////////////////
// One possible solution is to only render the stuff that's actually in the
// view. Native mobile frameworks have been doing this for years:
//
// https://developer.apple.com/library/ios/documentation/UIKit/Reference/UITableView_Class/index.html

///////////////////////////////////////////////////////////////////////////////
// I'd really like to do this in my web app! What does it look like when we
// try to do this with imperative JavaScript?
//
// https://github.com/airbnb/infinity
// https://github.com/emberjs/list-view
// https://github.com/mleibman/SlickGrid
