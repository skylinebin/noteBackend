/*
Navicat MySQL Data Transfer

Source Server         : MyLocalhostDatabase
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : notes

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2019-04-30 09:03:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `note`
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `note` varchar(200) NOT NULL,
  `time` varchar(20) DEFAULT NULL,
  `backup` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of note
-- ----------------------------
INSERT INTO `note` VALUES ('1', '有意思的网站：http://zhongguose.com/', '2019-04-16 20:23:52', 'by SkylineBin');
INSERT INTO `note` VALUES ('2', 'add website : https://cn.bing.com', '2019-04-18 18:49:32', 'by SkylineBin');
INSERT INTO `note` VALUES ('4', 'ceuiuuju', '2019-04-18 21:12:00', 'skylinebin');
INSERT INTO `note` VALUES ('11', 'Axios 中文使用：https://www.kancloud.cn/yunye/axios/234845', '2019-04-18 21:14:11', 'by Skylinebin');
INSERT INTO `note` VALUES ('12', '测试添加数据', '2019-04-18 21:19:18', 'SkylineBin');
INSERT INTO `note` VALUES ('13', '测试一下', '2019-04-18 21:32:51', 'SkylineBin');
INSERT INTO `note` VALUES ('14', '测试一下', '2019-04-18 21:57:55', '喵喵喵喵');
INSERT INTO `note` VALUES ('15', '最新一条', '2019-04-18 22:09:03', 'SkylineBin');
INSERT INTO `note` VALUES ('16', 'Charles 使用相关：https://www.cnblogs.com/mawenqiangios/p/8270238.html', '2019-04-22 11:14:11', 'by SkylineBin');
INSERT INTO `note` VALUES ('17', '使用以下CSS样式实现换行\nword-break: break-all; \nword-wrap: break-word;', '2019-04-29 16:13:08', 'by SkylineBin');
