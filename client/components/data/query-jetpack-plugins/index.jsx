/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

/**
 * Internal dependencies
 */
import { fetch } from 'state/plugins/installed/actions';
import { isRequestingForSites } from 'state/plugins/installed/selectors';

class QueryJetpackPlugins extends Component {
	componentWillMount() {
		if ( this.props.sites && ! this.props.isRequestingForSites ) {
			this.props.fetchPlugins( this.props.sites );
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( isEqual( nextProps.sites, this.props.sites ) ) {
			return;
		}
		this.refresh( nextProps.isRequestingForSites, nextProps.sites );
	}

	refresh( isRequesting, sites ) {
		if ( ! isRequesting ) {
			this.props.fetchPlugins( sites );
		}
	}

	render() {
		return null;
	}
}

QueryJetpackPlugins.propTypes = {
	sites: PropTypes.array.isRequired,
	isRequestingForSites: PropTypes.bool,
	fetchPlugins: PropTypes.func
};

QueryJetpackPlugins.defaultProps = {
	fetchPlugins: () => {}
};

export default connect(
	( state, props ) => {
		const sites = props.sites;
		return {
			isRequestingForSites: isRequestingForSites( state, sites ),
		};
	},
	{ fetchPlugins: fetch }
)( QueryJetpackPlugins );
