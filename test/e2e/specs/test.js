describe('State behavior', function() {
  it('should change from state 1 to state 2', function() {
    $('[ui-sref="centered.state1"]').click();
    expect(browser.getCurrentUrl()).toContain('/state1');
  });
});
