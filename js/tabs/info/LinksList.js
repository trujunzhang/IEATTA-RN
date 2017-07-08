/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */
'use strict';

let F8Colors = require('F8Colors');
let Image = require('Image');
let ItemsWithSeparator = require('../../common/ItemsWithSeparator');
let Linking = require('Linking');
let React = require('React');
let Section = require('./Section');
let StyleSheet = require('StyleSheet');
let F8Touchable = require('F8Touchable');
let { Text } = require('F8Text');
let View = require('View');

class LinksList extends React.Component {
  props: {
    title: string;
    links: Array<{
      logo?: ?string;
      title: string;
      url?: string;
      onPress?: () => void;
    }>;
  };

  render() {
    let content = this.props.links.map(
      (link) => <Row link={link} key={link.title} />
    );
    return (
      <Section title={this.props.title}>
        <ItemsWithSeparator separatorStyle={styles.separator}>
          {content}
        </ItemsWithSeparator>
      </Section>
    );
  }
}

class Row extends React.Component {
  props: {
    link: {
      logo: ?string;
      title: string;
      url?: string;
      onPress?: () => void;
    };
  };

  render() {
    let {logo, title} = this.props.link;
    let image = logo && <Image style={styles.picture} source={{uri: logo}} />;
    return (
      <F8Touchable onPress={this.handlePress.bind(this)}>
        <View style={styles.row}>
          {image}
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Image source={require('../../common/img/disclosure.png')} />
        </View>
      </F8Touchable>
    );
  }

  handlePress() {
    let {url, onPress} = this.props.link;
    if (onPress) {
      onPress();
    }
    if (url) {
      Linking.openURL(url);
    }
  }
}

const IMAGE_SIZE = 44;

let styles = StyleSheet.create({
  separator: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    height: 60,
  },
  picture: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    marginRight: 16,
  },
  title: {
    fontSize: 17,
    color: F8Colors.darkText,
    flex: 1,
  },
  button: {
    padding: 10,
  },
  like: {
    letterSpacing: 1,
    color: F8Colors.actionText,
    fontSize: 12,
  },
});

module.exports = LinksList;
