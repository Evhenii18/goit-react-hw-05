import { Component } from "react";

class ErrorBoundary extends Component {
	state = {
		hasError: false,
		error: null,
		info: null,
	};

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		this.setState({
			error: error,
			info: info,
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h1>Что-то пошло не так.</h1>
					<details>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.info && this.state.info.componentStack}
					</details>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
