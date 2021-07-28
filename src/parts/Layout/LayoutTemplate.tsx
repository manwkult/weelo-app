import { Layout } from 'antd';
import * as React from 'react';

const { Content, Header } = Layout;

export default class LayoutTemplate extends React.PureComponent<{}, { children?: React.ReactNode }> {
	public render() {
		return (
			<React.Fragment>
				<Layout className="layout">
					<Header>
						<div className="logo" />
					</Header>
					<Content className="site-layout-content">
						{this.props.children}
					</Content>
				</Layout>
			</React.Fragment>
		);
	}
}