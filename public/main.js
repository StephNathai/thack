var GroupInfo = React.createClass({
	render: function() {
		return(
			<div>
				<form>
					<h3>How many people are traveing in your group?</h3>
					<input type="number" name="groupNumber" /><br/>
					<h3>City origin:</h3><br/>
					<input type="text" name="cityOrigin" /><br/>
					<label><input type="checkbox" id="cbox1" value="exact_dates" /><h3>Exact date</h3></label>
					<label><input type="checkbox" id="cbox2" value="range_dates" /><h3>Date range</h3></label>
				</form>
			</div>
		);
	}
});

var MainApp = React.createClass({
	render: function() {
		return (
			<div>
				<h1>THACK APP</h1>
				<GroupInfo />
			</div>
		);
	}
});

ReactDOM.render(<MainApp />, document.getElementById('content') );
