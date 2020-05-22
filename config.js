let config  = {}
 
if(process.env.NODE_ENV === 'development'){
    // 开发环境
	config={
		url_config:"http://www.liaowang.xyz/",
		api_key:"abcde"
	}
}else{
    // 生产环境
    config={
    	url_config:"http://www.liaowang.xyz/",
    	api_key:"abcde"
    }
}
 
export default config
