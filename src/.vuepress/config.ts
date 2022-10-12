import {defaultTheme} from 'vuepress'

export default {
    lang: 'zh-CN',
    title: '个人博客',
    description: '个人博客',
    head: ['link', {rel: 'icon', href: '/logo2.png'}],
    theme: defaultTheme({

        colorModeSwitch: false,
        logo: '/logo2.png',
        repo: 'https://github.com/tanx7/blog.git',
        repoLabel: 'Github',
        lastUpdated: true,
        lastUpdatedText: '最后更新',
        editLink: false,
        backToHome: '返回首页',
        notFound: ['页面走丢了。。。'],
        navbar: [
            // NavbarItem
            {
                text: 'Docker',
                link: '/docker/',
            },
            // NavbarGroup
            {
                text: 'Group',
                children: ['/docker/dockerfile'],
            },
            // 字符串 - 页面文件路径
            '/bar/README.md',
            {
                text: 'Group',
                children: [
                    {
                        text: 'SubGroup',
                        children: ['/group/sub/foo.md', '/group/sub/bar.md'],
                    },
                ],
            },
        ],
        sidebarDepth: 2,
        sidebar: {
            '/docker/': [
                {
                    text: 'Dockerfile',
                    collapsible: true,
                    children: ['/docker/dockerfile'],
                },
            ],
        },
    }),
}
