//----------------------------------------------------------------------------泊
var domStay_list = [
{value:"1", text:"1泊"},
{value:"2", text:"2泊"},
{value:"3", text:"3泊"},
{value:"4", text:"4泊"},
{value:"5", text:"5泊"},
{value:"6", text:"6泊"},
{value:"7", text:"7泊"},
{value:"8", text:"8泊"},
{value:"9", text:"9泊"},
{value:"10", text:"10泊"},
{value:"11", text:"11泊"},
{value:"12", text:"12泊"},
{value:"13", text:"13泊"}];

//----------------------------------------------------------一部屋あたり利用人数
var domMembers_list = [
{value:"1", text:"1名"},
{value:"2", text:"2名"},
{value:"3", text:"3名"},
{value:"4", text:"4名"},
{value:"5", text:"5名"},
{value:"6", text:"6名"}];

//-------------------------------------------------------------------宿泊地 地区
var domRegion_list = new Object();

//北海道：02
domRegion_list["02"] = [
{value:"001", text:"札幌・小樽・千歳周辺"},
{value:"002", text:"道央"},
{value:"003", text:"道南"},
{value:"004", text:"道東"},
{value:"005", text:"道北"}];

//沖縄：03
domRegion_list["03"] = [
{value:"006", text:"本島"},
{value:"007", text:"離島"}];

//九州：05
domRegion_list["05"] = [
{value:"008", text:"福岡県"},
{value:"009", text:"佐賀県"},
{value:"010", text:"長崎県"},
{value:"011", text:"熊本県"},
{value:"012", text:"大分県"},
{value:"013", text:"宮崎県"},
{value:"014", text:"鹿児島県"}];

//関東・甲信越：07
domRegion_list["07"] = [
{value:"015", text:"群馬県"},
{value:"016", text:"栃木県"},
{value:"017", text:"茨城県"},
{value:"018", text:"東京都(伊豆諸島除く)"},
{value:"019", text:"千葉県"},
{value:"020", text:"埼玉県"},
{value:"021", text:"神奈川県"},
{value:"022", text:"伊豆諸島"},
{value:"023", text:"新潟県"},
{value:"048", text:"山梨県"},
{value:"049", text:"長野県"}];

//東北：08
domRegion_list["08"] = [
{value:"024", text:"青森県"},
{value:"025", text:"岩手県"},
{value:"026", text:"秋田県"},
{value:"027", text:"宮城県"},
{value:"028", text:"山形県"},
{value:"029", text:"福島県"}];

//関西：10
domRegion_list["10"] = [
{value:"030", text:"大阪府"},
{value:"031", text:"京都府"},
{value:"032", text:"兵庫県"},
{value:"033", text:"滋賀県"},
{value:"034", text:"奈良県"},
{value:"035", text:"和歌山県"}];

//中国・四国：11
domRegion_list["11"] = [
{value:"036", text:"鳥取県"},
{value:"037", text:"島根県"},
{value:"038", text:"岡山県"},
{value:"039", text:"広島県"},
{value:"040", text:"山口県"},
{value:"041", text:"徳島県"},
{value:"042", text:"香川県"},
{value:"043", text:"愛媛県"},
{value:"044", text:"高知県"}];

//北陸：14
domRegion_list["14"] = [
{value:"045", text:"石川県"},
{value:"046", text:"富山県"},
{value:"047", text:"福井県"}];

//東海：15
domRegion_list["15"] = [
{value:"050", text:"静岡県"},
{value:"051", text:"岐阜県"},
{value:"052", text:"三重県"},
{value:"053", text:"愛知県"}];



//-------------------------------------------------------------------宿泊地 地域
var domArea_list = new Object();

////////////////////////////////////////北海道：02

//札幌・小樽・千歳周辺：001
domArea_list["001"] = [
{value:"001", text:"札幌"},
{value:"002", text:"小樽"},
{value:"003", text:"定山渓"},
{value:"004", text:"朝里川"},
{value:"005", text:"千歳"},
{value:"006", text:"支笏湖"}];  
						  
//道央：002
domArea_list["002"] = [
{value:"007", text:"富良野"},
{value:"008", text:"旭川"},
{value:"009", text:"層雲峡"},
{value:"010", text:"トマム"},
{value:"011", text:"然別湖"},
{value:"012", text:"白金温泉"},
{value:"013", text:"天人峡"},
{value:"014", text:"夕張"},
{value:"024", text:"帯広"},
{value:"025", text:"十勝川"},
{value:"015", text:"その他道央"}];

//道南：003
domArea_list["003"] = [
{value:"016", text:"ニセコ"},
{value:"017", text:"ルスツ"},
{value:"018", text:"洞爺湖"},
{value:"019", text:"登別"},
{value:"020", text:"函館"},
{value:"021", text:"大沼"},
{value:"022", text:"湯の川"},
{value:"023", text:"その他道南"}];

//道東：004
domArea_list["004"] = [
{value:"026", text:"釧路"},
{value:"027", text:"阿寒湖"},
{value:"028", text:"川湯"},
{value:"029", text:"知床"},
{value:"030", text:"網走"},
{value:"031", text:"根室"},
{value:"032", text:"温根湯"},
{value:"033", text:"屈斜路湖"},
{value:"172", text:"標津・中標津"},
{value:"034", text:"その他道東"}];

//道北：005
domArea_list["005"] = [
{value:"035", text:"稚内"},
{value:"036", text:"利尻"},
{value:"037", text:"礼文"},
{value:"038", text:"その他道北"}];


////////////////////////////////////////沖縄：03

//本島：006
domArea_list["006"] = [
{value:"164", text:"中北部"},
{value:"165", text:"那覇市内"},
{value:"166", text:"北谷・宜野湾"},
{value:"167", text:"南部"},
{value:"168", text:"座間味・伊江島"}];

//離島：007
domArea_list["007"] = [
//{value:"169", text:"石垣島(小浜・黒島・西表含む)"},
{value:"169", text:"石垣島(八重山含む)"},
{value:"170", text:"宮古島"},
{value:"171", text:"久米島"}];


////////////////////////////////////////九州：05

//福岡県：008
domArea_list["008"] = [
{value:"136", text:"福岡市内"},
{value:"137", text:"北九州市内"},
{value:"138", text:"その他福岡県"}];

//佐賀県：009
domArea_list["009"] = [
{value:"139", text:"佐賀市内"},
{value:"140", text:"嬉野温泉・武雄温泉"},
{value:"141", text:"唐津市内"},
{value:"176", text:"有田・伊万里"},
{value:"142", text:"その他佐賀県"}];

//長崎県：010
domArea_list["010"] = [
{value:"143", text:"長崎市内"},
{value:"144", text:"平戸"},
{value:"145", text:"雲仙・島原"},
{value:"146", text:"ハウステンボス"},
{value:"189", text:"五島・対馬・壱岐"},
{value:"147", text:"その他長崎県"}];

//熊本県：011
domArea_list["011"] = [
{value:"148", text:"熊本市内"},
{value:"149", text:"阿蘇"},
{value:"150", text:"黒川温泉"},
{value:"177", text:"天草"},
{value:"151", text:"その他熊本県"}];

//大分県：012
domArea_list["012"] = [
{value:"152", text:"大分市内"},
{value:"153", text:"別府"},
{value:"154", text:"湯布院"},
{value:"155", text:"その他大分県"}];

//宮崎県：013
domArea_list["013"] = [
{value:"156", text:"宮崎市内"},
{value:"157", text:"シーガイア"},
{value:"158", text:"その他宮崎県"}];

//鹿児島県：014
domArea_list["014"] = [
{value:"159", text:"鹿児島市内"},
{value:"160", text:"霧島"},
{value:"161", text:"指宿"},
{value:"162", text:"屋久島・種子島"},
{value:"164", text:"与論島"},
{value:"188", text:"奄美"},
{value:"163", text:"その他鹿児島県"}];


////////////////////////////////////////関東・甲信越：07

//群馬県：015
domArea_list["015"] = [
{value:"047", text:"群馬"}];

//栃木県：016
domArea_list["016"] = [
{value:"048", text:"栃木"}];

//茨城県：017
domArea_list["017"] = [
{value:"049", text:"茨城"}];

//東京都：018
domArea_list["018"] = [
{value:"050", text:"新宿"},
{value:"051", text:"渋谷"},
{value:"052", text:"池袋"},
{value:"053", text:"赤坂・六本木"},
{value:"054", text:"品川・浜松町"},
{value:"055", text:"銀座・新橋・汐留・丸の内"},
{value:"056", text:"大森・蒲田・羽田"},
{value:"057", text:"上野・浅草"},
{value:"058", text:"錦糸町・両国・東陽町"},
{value:"059", text:"湾岸(竹芝・お台場)"},
{value:"175", text:"飯田橋・水道橋・九段"},
{value:"187", text:"東京西部"},
{value:"061", text:"その他東京都"}];

//千葉県：019
domArea_list["019"] = [
{value:"060", text:"舞浜・浦安・幕張"},
{value:"062", text:"成田"},
{value:"186", text:"千葉・木更津"},
{value:"063", text:"その他千葉県"}];

//埼玉県：020
domArea_list["020"] = [
{value:"064", text:"埼玉"}];

//神奈川県：021
domArea_list["021"] = [
{value:"065", text:"横浜"},
{value:"066", text:"鎌倉"},
{value:"067", text:"箱根"},
{value:"068", text:"その他神奈川県"}];

//伊豆諸島：022
domArea_list["022"] = [
{value:"069", text:"大島"},
{value:"071", text:"八丈島"}];

//新潟県：023
domArea_list["023"] = [
{value:"072", text:"新潟"},
{value:"073", text:"佐渡"},
{value:"074", text:"長岡"}];

//山梨県：048
domArea_list["048"] = [
{value:"074", text:"山梨"}];

//長野県：049
domArea_list["049"] = [
{value:"075", text:"白馬・大町温泉"},
{value:"076", text:"その他長野県"}];


////////////////////////////////////////東北：08

//青森県：024
domArea_list["024"] = [
{value:"039", text:"青森"}];

//岩手県：025
domArea_list["025"] = [
{value:"040", text:"岩手"}];

//秋田県：026
domArea_list["026"] = [
{value:"041", text:"秋田"}];

//宮城県：027
domArea_list["027"] = [
{value:"042", text:"仙台市内"},
{value:"173", text:"松島"},
{value:"174", text:"宮城蔵王"},
{value:"185", text:"鳴子"},
{value:"043", text:"その他宮城県"}];

//山形県：028
domArea_list["028"] = [
{value:"044", text:"山形蔵王"},
{value:"184", text:"酒田・鶴岡"},
{value:"045", text:"その他山形県"}];

//福島県：029
domArea_list["029"] = [
{value:"046", text:"福島"}];


////////////////////////////////////////関西：10

//大阪府：030
domArea_list["030"] = [
{value:"083", text:"大阪駅・梅田周辺"},
//{value:"084", text:"心斎橋・難波・天王寺"},
{value:"084", text:"心斎橋・難波・天王寺・上本町"},
//{value:"085", text:"新大阪"},
{value:"085", text:"新大阪・江坂"},
{value:"086", text:"ユニバーサルシティ"},
{value:"087", text:"伊丹空港"},
{value:"088", text:"関西空港"},
{value:"178", text:"天満・大阪城周辺"},
{value:"179", text:"淀屋橋・本町"},
{value:"089", text:"その他大阪府"}];

//京都府：031
domArea_list["031"] = [
{value:"090", text:"京都駅周辺"},
{value:"181", text:"二条城・御所周辺"},
{value:"182", text:"東山・宝ヶ池"},
{value:"183", text:"河原町・烏丸・四条大宮"},
{value:"091", text:"その他京都府"}];

//兵庫県：032
domArea_list["032"] = [
{value:"092", text:"神戸"},
//{value:"179", text:"城崎"},
{value:"179", text:"城崎・湯村"},
{value:"180", text:"有馬"},
{value:"096", text:"尼崎市内"},
{value:"093", text:"その他兵庫県"}];

//滋賀県：033
domArea_list["033"] = [
{value:"094", text:"滋賀"}];

//奈良県：034
domArea_list["034"] = [
{value:"095", text:"奈良"}];

//和歌山県：035
domArea_list["035"] = [
{value:"096", text:"和歌山"}];


////////////////////////////////////////中国・四国：11

//鳥取県：036
domArea_list["036"] = [
{value:"107", text:"鳥取市内"},
{value:"108", text:"米子市内"},
{value:"109", text:"皆生温泉"},
{value:"110", text:"その他鳥取県"}];

//島根県：037
domArea_list["037"] = [
{value:"111", text:"松江市内"},
{value:"112", text:"津和野"},
{value:"113", text:"玉造温泉"},
{value:"114", text:"隠岐"},
{value:"115", text:"その他島根県"}];

//岡山県：038
domArea_list["038"] = [
{value:"116", text:"岡山市内"},
{value:"117", text:"倉敷"},
{value:"118", text:"その他岡山県"}];

//広島県：039
domArea_list["039"] = [
{value:"119", text:"広島市内"},
{value:"121", text:"宮島"},
{value:"120", text:"その他広島県"}];

//山口県：040
domArea_list["040"] = [
{value:"121", text:"宇部市内"},
{value:"122", text:"萩市内"},
{value:"123", text:"湯田温泉"},
{value:"125", text:"下関市内"},
{value:"124", text:"その他山口県"}];

//徳島県：041
domArea_list["041"] = [
{value:"125", text:"徳島市内"},
{value:"126", text:"その他徳島県"}];

//香川県：042
domArea_list["042"] = [
{value:"127", text:"高松市内"},
{value:"128", text:"琴平温泉"},
{value:"129", text:"その他香川県"}];

//愛媛県：043
domArea_list["043"] = [
{value:"130", text:"松山市内"},
{value:"131", text:"道後温泉"},
{value:"133", text:"宇和島"},
{value:"132", text:"その他愛媛県"}];

//高知県：044
domArea_list["044"] = [
{value:"133", text:"高知市内"},
{value:"134", text:"足摺温泉"},
{value:"135", text:"その他高知県"}];


////////////////////////////////////////北陸：14

//石川県：045
domArea_list["045"] = [
{value:"097", text:"金沢市内"},
{value:"098", text:"能登半島"},
{value:"099", text:"加賀温泉"},
{value:"100", text:"白山・一里野高原"},
{value:"101", text:"その他石川県"}];

//富山県：046
domArea_list["046"] = [
{value:"102", text:"富山市内"},
{value:"103", text:"立山･黒部"},
{value:"104", text:"その他富山県"}];

//福井県：047
domArea_list["047"] = [
{value:"105", text:"福井市内"},
{value:"106", text:"その他福井県"}];


////////////////////////////////////////東海：15

//静岡県：050
domArea_list["050"] = [
{value:"077", text:"伊豆・熱海"},
{value:"078", text:"その他静岡県"}];

//岐阜県：051
domArea_list["051"] = [
{value:"079", text:"岐阜"}];

//三重県：052
domArea_list["052"] = [
{value:"080", text:"三重"}];

//愛知県：053
domArea_list["053"] = [
{value:"081", text:"名古屋市内"},
{value:"082", text:"その他愛知県"}];

//----------------------------------------------------往路出発空港：復路到着空港
var domFreeDepApo_list = [
{value:"HND", text:"東京(羽田)"},
{value:"NRT", text:"東京(成田)"},
{value:"ITM", text:"大阪(伊丹)"},
{value:"KIX", text:"大阪(関西)"},
{value:"UKB", text:"大阪(神戸)"},
{value:"CTS", text:"札幌(千歳)"},
{value:"NGO", text:"名古屋(中部)"},
{value:"FUK", text:"福岡"},
{value:"OKA", text:"沖縄(那覇)"},
{value:"NOP", text:"--------------"},
{value:"CTS", text:"札幌(千歳)"},
{value:"RIS", text:"利尻"},
{value:"WKJ", text:"稚内"},
{value:"MBE", text:"オホーツク紋別"},
{value:"MMB", text:"女満別"},
{value:"AKJ", text:"旭川"},
{value:"SHB", text:"根室中標津"},
{value:"KUH", text:"釧路"},
{value:"OBO", text:"帯広"},
{value:"HKD", text:"函館"},
{value:"AOJ", text:"青森"},
{value:"ONJ", text:"大館能代"},
{value:"AXT", text:"秋田"},
{value:"SYO", text:"庄内"},
{value:"SDJ", text:"仙台"},
{value:"FKS", text:"福島"},
{value:"HND", text:"東京(羽田)"},
{value:"NRT", text:"東京(成田)"},
{value:"OIM", text:"大島"},
{value:"HAC", text:"八丈島"},
{value:"FSZ", text:"静岡"},
{value:"NGO", text:"名古屋(中部)"},
{value:"KIJ", text:"新潟"},
{value:"TOY", text:"富山"},
{value:"KMQ", text:"小松"},
{value:"NTQ", text:"能登"},
{value:"ITM", text:"大阪(伊丹)"},
{value:"KIX", text:"大阪(関西)"},
{value:"UKB", text:"大阪(神戸)"},
{value:"OKJ", text:"岡山"},
{value:"HIJ", text:"広島"},
{value:"IWK", text:"岩国"},
{value:"UBJ", text:"山口宇部"},
{value:"TTJ", text:"鳥取"},
{value:"YGJ", text:"米子"},
{value:"IWJ", text:"萩・石見"},
{value:"TAK", text:"高松"},
{value:"TKS", text:"徳島"},
{value:"MYJ", text:"松山"},
{value:"KCZ", text:"高知"},
{value:"FUK", text:"福岡"},
{value:"HSG", text:"佐賀"},
{value:"OIT", text:"大分"},
{value:"KMJ", text:"熊本"},
{value:"NGS", text:"長崎"},
{value:"TSJ", text:"対馬"},
{value:"IKI", text:"壱岐"},
{value:"FUJ", text:"五島福江"},
{value:"KMI", text:"宮崎"},
{value:"KOJ", text:"鹿児島"},
{value:"OKA", text:"沖縄(那覇)"},
{value:"MMY", text:"宮古"},
{value:"ISG", text:"石垣"}];

//----------------------------------------------------往路到着空港：復路出発空港
var domFreeArrApo_list = [
{value:"HND", text:"東京(羽田)"},
{value:"NRT", text:"東京(成田)"},
{value:"ITM", text:"大阪(伊丹)"},
{value:"KIX", text:"大阪(関西)"},
{value:"UKB", text:"大阪(神戸)"},
{value:"CTS", text:"札幌(千歳)"},
{value:"NGO", text:"名古屋(中部)"},
{value:"FUK", text:"福岡"},
{value:"OKA", text:"沖縄(那覇)"},
{value:"NOP", text:"--------------"},
{value:"CTS", text:"札幌(千歳)"},
{value:"RIS", text:"利尻"},
{value:"WKJ", text:"稚内"},
{value:"MBE", text:"オホーツク紋別"},
{value:"MMB", text:"女満別"},
{value:"AKJ", text:"旭川"},
{value:"SHB", text:"根室中標津"},
{value:"KUH", text:"釧路"},
{value:"OBO", text:"帯広"},
{value:"HKD", text:"函館"},
{value:"AOJ", text:"青森"},
{value:"ONJ", text:"大館能代"},
{value:"AXT", text:"秋田"},
{value:"SYO", text:"庄内"},
{value:"SDJ", text:"仙台"},
{value:"FKS", text:"福島"},
{value:"HND", text:"東京(羽田)"},
{value:"NRT", text:"東京(成田)"},
{value:"OIM", text:"大島"},
{value:"HAC", text:"八丈島"},
{value:"FSZ", text:"静岡"},
{value:"NGO", text:"名古屋(中部)"},
{value:"KIJ", text:"新潟"},
{value:"TOY", text:"富山"},
{value:"KMQ", text:"小松"},
{value:"NTQ", text:"能登"},
{value:"ITM", text:"大阪(伊丹)"},
{value:"KIX", text:"大阪(関西)"},
{value:"UKB", text:"大阪(神戸)"},
{value:"OKJ", text:"岡山"},
{value:"HIJ", text:"広島"},
{value:"IWK", text:"岩国"},
{value:"UBJ", text:"山口宇部"},
{value:"TTJ", text:"鳥取"},
{value:"YGJ", text:"米子"},
{value:"IWJ", text:"萩・石見"},
{value:"TAK", text:"高松"},
{value:"TKS", text:"徳島"},
{value:"MYJ", text:"松山"},
{value:"KCZ", text:"高知"},
{value:"FUK", text:"福岡"},
{value:"HSG", text:"佐賀"},
{value:"OIT", text:"大分"},
{value:"KMJ", text:"熊本"},
{value:"NGS", text:"長崎"},
{value:"TSJ", text:"対馬"},
{value:"IKI", text:"壱岐"},
{value:"FUJ", text:"五島福江"},
{value:"KMI", text:"宮崎"},
{value:"KOJ", text:"鹿児島"},
{value:"OKA", text:"沖縄(那覇)"},
{value:"MMY", text:"宮古"},
{value:"ISG", text:"石垣"}];


//--------------------------------------------------------到着空港と地区の紐付け
var domRelation_obj = {

	// 空港コード : ["地区コード","地区デフォルト値","地域デフォルト値"]

	// 07 関東・甲信越
	"HND" : ["07","018", ""],     // 羽田
	"NRT" : ["07","019", "062"],  // 成田
	"KIJ" : ["07","023", "072"],  // 新潟
	"HAC" : ["07","022", "071"],  // 八丈島
	"OIM" : ["07","022", "069"],  // 大島

	// 10 関西
	"ITM" : ["10","030", ""],     // 伊丹
	"KIX" : ["10","030", ""],     // 関西
	"UKB" : ["10","032", "092"],  // 神戸

	// 15 東海
	"NGO" : ["15","053", "081"],  // 中部国際
	"FSZ" : ["15","050", ""],     // 静岡

	// 05 九州
	"FUK" : ["05","008", "136"],  // 福岡
	"KOJ" : ["05","014", "159"],  // 鹿児島
	"KMI" : ["05","013", "156"],  // 宮崎
	"KMJ" : ["05","011", "148"],  // 熊本
	"NGS" : ["05","010", "143"],  // 長崎
	"OIT" : ["05","012", "152"],  // 大分
	"HSG" : ["05","009", "139"],  // 佐賀
	"IKI" : ["05","010", "189"],  // 壱岐
	"FUJ" : ["05","010", "189"],  // 五島福江
	"TSJ" : ["05","010", "189"],  // 対馬
	"KKJ" : ["05","008", "136"],  // 北九州

	// 02 北海道
	"CTS" : ["02","001", "001"],  // 千歳
	"HKD" : ["02","003", "020"],  // 函館 
	"AKJ" : ["02","002", "008"],  // 旭川
	"KUH" : ["02","004", "026"],  // 釧路
	"MMB" : ["02","004", ""],     // 女満別
	"WKJ" : ["02","005", "035"],  // 稚内
	"SHB" : ["02","004", ""],     // 中標津
	"MBE" : ["02","004", ""],     // 紋別
	"RIS" : ["02","005", "036"],  // 利尻
	"OBO" : ["02","002", "024"],  // 帯広

	// 03 沖縄
	"OKA" : ["03","006", ""],     // 那覇
	"ISG" : ["03","007", "169"],  // 石垣
	"MMY" : ["03","007", "170"],  // 宮古

	// 08 東北 
	"SDJ" : ["08","027", "042"],  // 仙台
	"AXT" : ["08","026", "041"],  // 秋田
	"SYO" : ["08","028", ""],     // 庄内 
	"ONJ" : ["08","026", "041"],  // 大館能代
	"FKS" : ["08","029", "046"],  // 福島
	"AOJ" : ["08","024", "039"],  // 青森

	// 14 北陸
	"KMQ" : ["14","045", "097"],  // 小松
	"TOY" : ["14","046", "102"],  // 富山
	"NTQ" : ["14","045", "098"],  // 能登

	// 11 中・四国
	"HIJ" : ["11","039", "119"],  // 広島
	"OKJ" : ["11","038", "116"],  // 岡山
	"IWJ" : ["11","037", ""],     // 石見
	"TTJ" : ["11","036", "107"],  // 鳥取
	"IWK" : ["11","040", "124"],  // 岩国
	"UBJ" : ["11","040", "121"],  // 山口宇部
	"YGJ" : ["11","036", "108"],  // 米子
	"TAK" : ["11","042", "127"],  // 高松
	"MYJ" : ["11","043", "130"],  // 松山
	"KCZ" : ["11","044", "133"],  // 高知
	"TKS" : ["11","041", "125"]   // 徳島
};

//------------------------------------------------------------クエリーパラメータ
Quickstart_free = "1";
Refid_free = "L2FNB";
