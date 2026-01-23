import React from 'react';

export default function BlogSidebar() {
	return (
		<aside className="col col--3">
			<nav className="sidebar_re4s thin-scrollbar blog-sidebar-no-select" aria-label="Blog recent posts navigation">
				<div className="sidebarItemTitle_pO2u margin-bottom--md">Recent posts</div>

				<div role="group">
					<h3 className="yearGroupHeading_rMGB">2025</h3>
					<ul className="sidebarItemList_Yudw clean-list">
						<li className="sidebarItem__DBe"><a className="sidebarItemLink_mo7H" href="/blog/first-hackathon">Geol Go inception during Hackathon</a></li>
					</ul>
				</div>

				<div role="group">
					<h3 className="yearGroupHeading_rMGB">2022</h3>
					<ul className="sidebarItemList_Yudw clean-list">
						<li className="sidebarItem__DBe"><a className="sidebarItemLink_mo7H" href="/blog/end-of-life-date-first-article">Manage EoLs like a boss with endoflife.date</a></li>
					</ul>
				</div>

				<div role="group">
					<h3 className="yearGroupHeading_rMGB">2021</h3>
					<ul className="sidebarItemList_Yudw clean-list">
						<li className="sidebarItem__DBe"><a className="sidebarItemLink_mo7H" href="/blog/welcome">Welcome</a></li>
						<li className="sidebarItem__DBe"><a className="sidebarItemLink_mo7H" href="/blog/mdx-blog-post">MDX Blog Post</a></li>
					</ul>
				</div>
			</nav>
		</aside>
	);
}
